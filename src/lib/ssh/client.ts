import * as tls from 'node:tls';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Client as SSH2Client, type SFTPWrapper } from 'ssh2';
import type { Readable, Writable } from 'node:stream';
import type {
  SSHConnectionInfo,
  SSHOptions,
  ExecuteOptions,
  ExecuteResult,
  ExecuteStreamOptions,
  ConnectOptions,
  ShellSession,
  SFTPOptions,
  TransferResult,
} from './types';
import {
  SSHError,
  SSHTLSError,
  SSHHandshakeError,
  SSHAuthenticationError,
  SSHTimeoutError,
  SFTPError,
} from './errors';

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_KEEPALIVE_INTERVAL = 10000;
const DEFAULT_KEEPALIVE_MAX_COUNT = 6;

/**
 * SSH Client for connecting to Vers VMs over TLS.
 *
 * This client implements SSH-over-TLS, connecting to port 443 with TLS
 * and running the SSH protocol on top of the encrypted connection.
 */
export class SSHClient {
  private readonly connectionInfo: SSHConnectionInfo;
  private client: SSH2Client | null = null;
  private keepAliveTimer: ReturnType<typeof setInterval> | null = null;
  private missedKeepalives = 0;
  private options: SSHOptions;

  constructor(connectionInfo: SSHConnectionInfo, options: SSHOptions = {}) {
    this.connectionInfo = connectionInfo;
    this.options = options;
  }

  /**
   * Get the hostname for TLS/SSH connection
   */
  private get hostname(): string {
    return this.connectionInfo.hostname;
  }

  /**
   * Establish SSH connection over TLS
   */
  async connect(options: SSHOptions = {}): Promise<SSH2Client> {
    if (this.client) {
      return this.client;
    }

    const mergedOptions = { ...this.options, ...options };
    const {
      timeout = DEFAULT_TIMEOUT,
      keepAliveInterval = DEFAULT_KEEPALIVE_INTERVAL,
      keepAliveMaxCount = DEFAULT_KEEPALIVE_MAX_COUNT,
    } = mergedOptions;

    // Establish TLS connection
    const tlsSocket = await this.createTLSConnection(timeout);

    // SSH handshake over TLS
    const sshClient = await this.performSSHHandshake(tlsSocket, timeout);

    // Start keep-alive
    this.startKeepAlive(sshClient, keepAliveInterval, keepAliveMaxCount);

    this.client = sshClient;
    return sshClient;
  }

  /**
   * Create TLS connection to VM
   */
  private createTLSConnection(timeout: number): Promise<tls.TLSSocket> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new SSHTimeoutError('TLS connection timed out'));
      }, timeout);

      const socket = tls.connect(
        {
          host: this.hostname,
          port: 443,
          servername: this.hostname, // SNI
          rejectUnauthorized: false, // Matches Go InsecureSkipVerify
          minVersion: 'TLSv1.2',
        },
        () => {
          clearTimeout(timeoutId);
          resolve(socket);
        },
      );

      socket.on('error', (err) => {
        clearTimeout(timeoutId);
        reject(new SSHTLSError(err.message, err));
      });
    });
  }

  /**
   * Perform SSH handshake over TLS socket
   */
  private performSSHHandshake(tlsSocket: tls.TLSSocket, timeout: number): Promise<SSH2Client> {
    return new Promise((resolve, reject) => {
      const client = new SSH2Client();

      const timeoutId = setTimeout(() => {
        client.end();
        tlsSocket.destroy();
        reject(new SSHTimeoutError('SSH handshake timed out'));
      }, timeout);

      client.on('ready', () => {
        clearTimeout(timeoutId);
        resolve(client);
      });

      client.on('error', (err) => {
        clearTimeout(timeoutId);
        tlsSocket.destroy();
        if (err.message.includes('authentication') || err.message.includes('Auth')) {
          reject(new SSHAuthenticationError(err.message, err));
        } else {
          reject(new SSHHandshakeError(err.message, err));
        }
      });

      client.on('close', () => {
        clearTimeout(timeoutId);
      });

      client.connect({
        sock: tlsSocket,
        username: 'root',
        privateKey: this.connectionInfo.privateKey,
        readyTimeout: timeout,
      });
    });
  }

  /**
   * Start keep-alive timer (matches Go: 10s interval, 6 max missed)
   */
  private startKeepAlive(client: SSH2Client, interval: number, maxCount: number): void {
    this.missedKeepalives = 0;

    this.keepAliveTimer = setInterval(() => {
      // Send keepalive@openssh.com request
      client.exec('true', (err) => {
        if (err) {
          this.missedKeepalives++;
          if (this.missedKeepalives >= maxCount) {
            this.close();
          }
        } else {
          this.missedKeepalives = 0;
        }
      });
    }, interval);
  }

  /**
   * Execute a command and return the result
   */
  async execute(command: string, options: ExecuteOptions = {}): Promise<ExecuteResult> {
    const client = await this.connect(options);

    return new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';

      // Handle abort signal
      if (options.signal?.aborted) {
        reject(new SSHError('Operation aborted'));
        return;
      }

      const abortHandler = () => {
        reject(new SSHError('Operation aborted'));
      };
      options.signal?.addEventListener('abort', abortHandler, { once: true });

      client.exec(command, (err, stream) => {
        if (err) {
          options.signal?.removeEventListener('abort', abortHandler);
          reject(new SSHError(`Failed to execute command: ${err.message}`, err));
          return;
        }

        stream.on('data', (data: Buffer) => {
          stdout += data.toString();
        });

        stream.stderr.on('data', (data: Buffer) => {
          stderr += data.toString();
        });

        stream.on('close', (code: number | null) => {
          options.signal?.removeEventListener('abort', abortHandler);
          resolve({ stdout, stderr, exitCode: code ?? 0 });
        });

        stream.on('error', (streamErr: Error) => {
          options.signal?.removeEventListener('abort', abortHandler);
          reject(new SSHError(`Stream error: ${streamErr.message}`, streamErr));
        });
      });
    });
  }

  /**
   * Execute with streaming I/O
   */
  async executeStream(command: string, options: ExecuteStreamOptions = {}): Promise<number> {
    const client = await this.connect(options);

    return new Promise((resolve, reject) => {
      if (options.signal?.aborted) {
        reject(new SSHError('Operation aborted'));
        return;
      }

      const abortHandler = () => {
        reject(new SSHError('Operation aborted'));
      };
      options.signal?.addEventListener('abort', abortHandler, { once: true });

      client.exec(command, (err, stream) => {
        if (err) {
          options.signal?.removeEventListener('abort', abortHandler);
          reject(new SSHError(`Failed to execute command: ${err.message}`, err));
          return;
        }

        if (options.stdout) {
          stream.pipe(options.stdout);
        }

        if (options.stderr) {
          stream.stderr.pipe(options.stderr);
        }

        if (options.stdin) {
          options.stdin.pipe(stream);
        }

        stream.on('close', (code: number | null) => {
          options.signal?.removeEventListener('abort', abortHandler);
          resolve(code ?? 0);
        });

        stream.on('error', (streamErr: Error) => {
          options.signal?.removeEventListener('abort', abortHandler);
          reject(new SSHError(`Stream error: ${streamErr.message}`, streamErr));
        });
      });
    });
  }

  /**
   * Open interactive shell session
   */
  async shell(options: ConnectOptions = {}): Promise<ShellSession> {
    const client = await this.connect(options);

    const { term = 'xterm-256color', cols = 80, rows = 24 } = options;

    return new Promise((resolve, reject) => {
      if (options.signal?.aborted) {
        reject(new SSHError('Operation aborted'));
        return;
      }

      client.shell(
        {
          term,
          cols,
          rows,
          modes: {
            ECHO: 1,
            TTY_OP_ISPEED: 14400,
            TTY_OP_OSPEED: 14400,
          },
        },
        (err, stream) => {
          if (err) {
            reject(new SSHError(`Failed to open shell: ${err.message}`, err));
            return;
          }

          let exitCode = 0;
          const closePromise = new Promise<number>((resolveClose) => {
            stream.on('close', (code: number | null) => {
              exitCode = code ?? 0;
              resolveClose(exitCode);
            });
          });

          const session: ShellSession = {
            stdin: stream as unknown as Writable,
            stdout: stream as unknown as Readable,
            stderr: stream.stderr as unknown as Readable,
            resize: (newCols: number, newRows: number) => {
              stream.setWindow(newRows, newCols, 0, 0);
            },
            close: async () => {
              stream.end();
              stream.destroy();
            },
            wait: () => closePromise,
          };

          // Handle abort signal
          options.signal?.addEventListener(
            'abort',
            () => {
              session.close();
            },
            { once: true },
          );

          resolve(session);
        },
      );
    });
  }

  /**
   * Upload file or directory via SFTP
   */
  async upload(localPath: string, remotePath: string, options: SFTPOptions = {}): Promise<TransferResult> {
    const client = await this.connect(options);
    const sftp = await this.getSFTP(client);

    const stats = await fs.promises.stat(localPath);

    if (stats.isDirectory()) {
      if (!options.recursive) {
        throw new SFTPError('Source is a directory, use recursive option');
      }
      return this.uploadDirectory(sftp, localPath, remotePath, options);
    }

    return this.uploadFile(sftp, localPath, remotePath, options);
  }

  /**
   * Download file or directory via SFTP
   */
  async download(remotePath: string, localPath: string, options: SFTPOptions = {}): Promise<TransferResult> {
    const client = await this.connect(options);
    const sftp = await this.getSFTP(client);

    const stats = await this.sftpStat(sftp, remotePath);

    if (stats.isDirectory()) {
      if (!options.recursive) {
        throw new SFTPError('Source is a directory, use recursive option');
      }
      return this.downloadDirectory(sftp, remotePath, localPath, options);
    }

    return this.downloadFile(sftp, remotePath, localPath, options);
  }

  /**
   * Get SFTP subsystem
   */
  private getSFTP(client: SSH2Client): Promise<SFTPWrapper> {
    return new Promise((resolve, reject) => {
      client.sftp((err, sftp) => {
        if (err) {
          reject(new SFTPError(`Failed to open SFTP: ${err.message}`, err));
        } else {
          resolve(sftp);
        }
      });
    });
  }

  /**
   * Stat a remote path via SFTP
   */
  private sftpStat(sftp: SFTPWrapper, remotePath: string): Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
      sftp.stat(remotePath, (err, stats) => {
        if (err) {
          reject(new SFTPError(`Failed to stat remote path: ${err.message}`, err));
        } else {
          resolve(stats as unknown as fs.Stats);
        }
      });
    });
  }

  /**
   * Upload single file using fastPut for reliable transfer
   */
  private async uploadFile(
    sftp: SFTPWrapper,
    localPath: string,
    remotePath: string,
    options: SFTPOptions,
  ): Promise<TransferResult> {
    const stats = await fs.promises.stat(localPath);
    const fileSize = stats.size;

    return new Promise((resolve, reject) => {
      sftp.fastPut(
        localPath,
        remotePath,
        {
          step: (transferred, _chunk, total) => {
            options.onProgress?.(transferred, total, localPath);
          },
        },
        (err) => {
          if (err) {
            reject(new SFTPError(`Failed to upload file: ${err.message}`, err));
          } else {
            resolve({ filesTransferred: 1, bytesTransferred: fileSize });
          }
        },
      );
    });
  }

  /**
   * Upload directory recursively
   */
  private async uploadDirectory(
    sftp: SFTPWrapper,
    localDir: string,
    remoteDir: string,
    options: SFTPOptions,
  ): Promise<TransferResult> {
    let filesTransferred = 0;
    let bytesTransferred = 0;

    // Create remote directory
    await this.sftpMkdir(sftp, remoteDir);

    const entries = await fs.promises.readdir(localDir, { withFileTypes: true });

    for (const entry of entries) {
      const localPath = path.join(localDir, entry.name);
      const remotePath = `${remoteDir}/${entry.name}`;

      if (entry.isDirectory()) {
        const result = await this.uploadDirectory(sftp, localPath, remotePath, options);
        filesTransferred += result.filesTransferred;
        bytesTransferred += result.bytesTransferred;
      } else {
        const result = await this.uploadFile(sftp, localPath, remotePath, options);
        filesTransferred += result.filesTransferred;
        bytesTransferred += result.bytesTransferred;
      }
    }

    return { filesTransferred, bytesTransferred };
  }

  /**
   * Create remote directory (ignore already exists)
   */
  private sftpMkdir(sftp: SFTPWrapper, remotePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      sftp.mkdir(remotePath, (err) => {
        // Ignore "already exists" errors (code 4 in SFTP)
        if (err && (err as any).code !== 4) {
          reject(new SFTPError(`Failed to create directory: ${err.message}`, err));
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Download single file using fastGet for reliable transfer
   */
  private async downloadFile(
    sftp: SFTPWrapper,
    remotePath: string,
    localPath: string,
    options: SFTPOptions,
  ): Promise<TransferResult> {
    // Ensure parent directory exists
    await fs.promises.mkdir(path.dirname(localPath), { recursive: true });

    // Get remote file size for progress tracking
    const stats = await this.sftpStat(sftp, remotePath);
    const fileSize = stats.size;

    return new Promise((resolve, reject) => {
      sftp.fastGet(
        remotePath,
        localPath,
        {
          step: (transferred, _chunk, total) => {
            options.onProgress?.(transferred, total, remotePath);
          },
        },
        (err) => {
          if (err) {
            reject(new SFTPError(`Failed to download file: ${err.message}`, err));
          } else {
            resolve({ filesTransferred: 1, bytesTransferred: fileSize });
          }
        },
      );
    });
  }

  /**
   * Download directory recursively
   */
  private async downloadDirectory(
    sftp: SFTPWrapper,
    remoteDir: string,
    localDir: string,
    options: SFTPOptions,
  ): Promise<TransferResult> {
    let filesTransferred = 0;
    let bytesTransferred = 0;

    // Create local directory
    await fs.promises.mkdir(localDir, { recursive: true });

    const entries = await this.sftpReaddir(sftp, remoteDir);

    for (const entry of entries) {
      const remotePath = `${remoteDir}/${entry.filename}`;
      const localPath = path.join(localDir, entry.filename);

      if (entry.attrs.isDirectory()) {
        const result = await this.downloadDirectory(sftp, remotePath, localPath, options);
        filesTransferred += result.filesTransferred;
        bytesTransferred += result.bytesTransferred;
      } else {
        const result = await this.downloadFile(sftp, remotePath, localPath, options);
        filesTransferred += result.filesTransferred;
        bytesTransferred += result.bytesTransferred;
      }
    }

    return { filesTransferred, bytesTransferred };
  }

  /**
   * Read remote directory
   */
  private sftpReaddir(
    sftp: SFTPWrapper,
    remotePath: string,
  ): Promise<Array<{ filename: string; attrs: { isDirectory: () => boolean } }>> {
    return new Promise((resolve, reject) => {
      sftp.readdir(remotePath, (err, list) => {
        if (err) {
          reject(new SFTPError(`Failed to read directory: ${err.message}`, err));
        } else {
          resolve(list as Array<{ filename: string; attrs: { isDirectory: () => boolean } }>);
        }
      });
    });
  }

  /**
   * Close the SSH connection
   */
  close(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }

    if (this.client) {
      this.client.end();
      this.client = null;
    }
  }

  /**
   * Check if connection is active
   */
  get isConnected(): boolean {
    return this.client !== null;
  }
}
