import type { VmResource } from "../resources/vm.js";
import { SSHClient } from "./ssh/client.js";
import type { ExecuteOptions, ExecuteResult, ExecuteStreamOptions, ConnectOptions, ShellSession, SFTPOptions, TransferResult } from "./ssh/types.js";
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
    download(vmId: string, remotePath: string, localPath: string, options?: SFTPOptions): Promise<TransferResult>;
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
export declare function withSSH(vmResource: VmResource): VmResourceWithSSH;
//# sourceMappingURL=vm-ssh.d.ts.map