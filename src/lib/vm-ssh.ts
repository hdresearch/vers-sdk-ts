import type { VmResource, VmSSHKeyResponse } from '../resources/vm';
import { SSHClient } from './ssh/client';
import type {
  ExecuteOptions,
  ExecuteResult,
  ExecuteStreamOptions,
  ConnectOptions,
  ShellSession,
  SFTPOptions,
  TransferResult,
  SSHConnectionInfo,
} from './ssh/types';

// Cache for SSH keys (in-memory, per-process)
const keyCache = new Map<string, VmSSHKeyResponse>();

/**
 * Extended VmResource with SSH functionality
 */
export interface VmResourceWithSSH extends VmResource {
  /**
   * Execute a command on a VM and return the result.
   *
   * @example
   * ```ts
   * const vm = withSSH(client.vm);
   * const result = await vm.execute('vm-123', 'ls -la /');
   * console.log(result.stdout);
   * console.log('Exit code:', result.exitCode);
   * ```
   */
  execute(vmId: string, command: string, options?: ExecuteOptions): Promise<ExecuteResult>;

  /**
   * Execute a command with streaming I/O.
   *
   * @example
   * ```ts
   * const vm = withSSH(client.vm);
   * const exitCode = await vm.executeStream('vm-123', 'apt update', {
   *   stdout: process.stdout,
   *   stderr: process.stderr,
   * });
   * ```
   */
  executeStream(vmId: string, command: string, options?: ExecuteStreamOptions): Promise<number>;

  /**
   * Open an interactive shell session.
   *
   * @example
   * ```ts
   * const vm = withSSH(client.vm);
   * const session = await vm.connect('vm-123', {
   *   cols: process.stdout.columns,
   *   rows: process.stdout.rows,
   * });
   *
   * process.stdin.pipe(session.stdin);
   * session.stdout.pipe(process.stdout);
   * session.stderr.pipe(process.stderr);
   *
   * process.stdout.on('resize', () => {
   *   session.resize(process.stdout.columns, process.stdout.rows);
   * });
   *
   * await session.wait();
   * ```
   */
  connect(vmId: string, options?: ConnectOptions): Promise<ShellSession>;

  /**
   * Upload files to a VM via SFTP.
   *
   * @example
   * ```ts
   * const vm = withSSH(client.vm);
   *
   * // Upload single file
   * await vm.upload('vm-123', './local-file.txt', '/remote/file.txt');
   *
   * // Upload directory recursively
   * await vm.upload('vm-123', './local-dir', '/remote/dir', { recursive: true });
   * ```
   */
  upload(vmId: string, localPath: string, remotePath: string, options?: SFTPOptions): Promise<TransferResult>;

  /**
   * Download files from a VM via SFTP.
   *
   * @example
   * ```ts
   * const vm = withSSH(client.vm);
   *
   * // Download single file
   * await vm.download('vm-123', '/remote/file.txt', './local-file.txt');
   *
   * // Download directory recursively
   * await vm.download('vm-123', '/remote/dir', './local-dir', { recursive: true });
   * ```
   */
  download(
    vmId: string,
    remotePath: string,
    localPath: string,
    options?: SFTPOptions,
  ): Promise<TransferResult>;

  /**
   * Get a reusable SSH client for multiple operations.
   * Caller is responsible for calling `close()` when done.
   *
   * @example
   * ```ts
   * const vm = withSSH(client.vm);
   * const ssh = await vm.getClient('vm-123');
   *
   * try {
   *   await ssh.execute('apt update');
   *   await ssh.execute('apt install -y nginx');
   *   await ssh.upload('./config.conf', '/etc/nginx/nginx.conf');
   *   await ssh.execute('systemctl restart nginx');
   * } finally {
   *   ssh.close();
   * }
   * ```
   */
  getClient(vmId: string, options?: ExecuteOptions): Promise<SSHClient>;

  /**
   * Clear cached SSH key for a VM (or all VMs if no vmId provided).
   * Use this if you need to force re-fetching the SSH key.
   */
  clearKeyCache(vmId?: string): void;
}

/**
 * Get SSH connection info for a VM, with key caching.
 */
async function getConnectionInfo(vmResource: VmResource, vmId: string): Promise<SSHConnectionInfo> {
  let keyResponse = keyCache.get(vmId);

  if (!keyResponse) {
    keyResponse = await vmResource.getSSHKey(vmId);
    keyCache.set(vmId, keyResponse);
  }

  return {
    vmId,
    privateKey: keyResponse.ssh_private_key,
    hostname: `${vmId}.vm.vers.sh`,
    port: 443,
  };
}

/**
 * Execute a command on a VM.
 */
async function execute(
  vmResource: VmResource,
  vmId: string,
  command: string,
  options?: ExecuteOptions,
): Promise<ExecuteResult> {
  const connectionInfo = await getConnectionInfo(vmResource, vmId);
  const client = new SSHClient(connectionInfo);

  try {
    return await client.execute(command, options);
  } finally {
    client.close();
  }
}

/**
 * Execute a command with streaming I/O.
 */
async function executeStream(
  vmResource: VmResource,
  vmId: string,
  command: string,
  options?: ExecuteStreamOptions,
): Promise<number> {
  const connectionInfo = await getConnectionInfo(vmResource, vmId);
  const client = new SSHClient(connectionInfo);

  try {
    return await client.executeStream(command, options);
  } finally {
    client.close();
  }
}

/**
 * Open an interactive shell session.
 */
async function connect(
  vmResource: VmResource,
  vmId: string,
  options?: ConnectOptions,
): Promise<ShellSession> {
  const connectionInfo = await getConnectionInfo(vmResource, vmId);
  const client = new SSHClient(connectionInfo);

  // Don't close client here - the shell session owns the connection
  // The session will be closed when the user calls close() or the shell exits
  const session = await client.shell(options);

  // Wrap the close method to also close the underlying client
  const originalClose = session.close;
  session.close = async () => {
    await originalClose();
    client.close();
  };

  return session;
}

/**
 * Upload files to a VM via SFTP.
 */
async function upload(
  vmResource: VmResource,
  vmId: string,
  localPath: string,
  remotePath: string,
  options?: SFTPOptions,
): Promise<TransferResult> {
  const connectionInfo = await getConnectionInfo(vmResource, vmId);
  const client = new SSHClient(connectionInfo);

  try {
    return await client.upload(localPath, remotePath, options);
  } finally {
    client.close();
  }
}

/**
 * Download files from a VM via SFTP.
 */
async function download(
  vmResource: VmResource,
  vmId: string,
  remotePath: string,
  localPath: string,
  options?: SFTPOptions,
): Promise<TransferResult> {
  const connectionInfo = await getConnectionInfo(vmResource, vmId);
  const client = new SSHClient(connectionInfo);

  try {
    return await client.download(remotePath, localPath, options);
  } finally {
    client.close();
  }
}

/**
 * Get a reusable SSH client for multiple operations.
 */
async function getClient(vmResource: VmResource, vmId: string, options?: ExecuteOptions): Promise<SSHClient> {
  const connectionInfo = await getConnectionInfo(vmResource, vmId);
  const client = new SSHClient(connectionInfo);
  await client.connect(options);
  return client;
}

/**
 * Clear cached SSH key(s).
 */
function clearKeyCache(vmId?: string): void {
  if (vmId) {
    keyCache.delete(vmId);
  } else {
    keyCache.clear();
  }
}

/**
 * Add SSH methods to a VmResource.
 *
 * @example
 * ```ts
 * import Vers, { withSSH } from 'vers';
 *
 * const client = new Vers();
 * const vm = withSSH(client.vm);
 *
 * // Now you can use SSH methods
 * const result = await vm.execute('vm-123', 'whoami');
 * console.log(result.stdout); // "root"
 * ```
 */
export function withSSH(vmResource: VmResource): VmResourceWithSSH {
  return Object.assign(vmResource, {
    execute: (vmId: string, command: string, options?: ExecuteOptions) =>
      execute(vmResource, vmId, command, options),
    executeStream: (vmId: string, command: string, options?: ExecuteStreamOptions) =>
      executeStream(vmResource, vmId, command, options),
    connect: (vmId: string, options?: ConnectOptions) => connect(vmResource, vmId, options),
    upload: (vmId: string, localPath: string, remotePath: string, options?: SFTPOptions) =>
      upload(vmResource, vmId, localPath, remotePath, options),
    download: (vmId: string, remotePath: string, localPath: string, options?: SFTPOptions) =>
      download(vmResource, vmId, remotePath, localPath, options),
    getClient: (vmId: string, options?: ExecuteOptions) => getClient(vmResource, vmId, options),
    clearKeyCache,
  }) as VmResourceWithSSH;
}
