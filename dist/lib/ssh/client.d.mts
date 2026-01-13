import { Client as SSH2Client } from 'ssh2';
import type { SSHConnectionInfo, SSHOptions, ExecuteOptions, ExecuteResult, ExecuteStreamOptions, ConnectOptions, ShellSession, SFTPOptions, TransferResult } from "./types.mjs";
/**
 * SSH Client for connecting to Vers VMs over TLS.
 *
 * This client implements SSH-over-TLS, connecting to port 443 with TLS
 * and running the SSH protocol on top of the encrypted connection.
 */
export declare class SSHClient {
    private readonly connectionInfo;
    private client;
    private keepAliveTimer;
    private missedKeepalives;
    private options;
    constructor(connectionInfo: SSHConnectionInfo, options?: SSHOptions);
    /**
     * Get the hostname for TLS/SSH connection
     */
    private get hostname();
    /**
     * Establish SSH connection over TLS
     */
    connect(options?: SSHOptions): Promise<SSH2Client>;
    /**
     * Create TLS connection to VM
     */
    private createTLSConnection;
    /**
     * Perform SSH handshake over TLS socket
     */
    private performSSHHandshake;
    /**
     * Start keep-alive timer (matches Go: 10s interval, 6 max missed)
     */
    private startKeepAlive;
    /**
     * Execute a command and return the result
     */
    execute(command: string, options?: ExecuteOptions): Promise<ExecuteResult>;
    /**
     * Execute with streaming I/O
     */
    executeStream(command: string, options?: ExecuteStreamOptions): Promise<number>;
    /**
     * Open interactive shell session
     */
    shell(options?: ConnectOptions): Promise<ShellSession>;
    /**
     * Upload file or directory via SFTP
     */
    upload(localPath: string, remotePath: string, options?: SFTPOptions): Promise<TransferResult>;
    /**
     * Download file or directory via SFTP
     */
    download(remotePath: string, localPath: string, options?: SFTPOptions): Promise<TransferResult>;
    /**
     * Get SFTP subsystem
     */
    private getSFTP;
    /**
     * Stat a remote path via SFTP
     */
    private sftpStat;
    /**
     * Upload single file using fastPut for reliable transfer
     */
    private uploadFile;
    /**
     * Upload directory recursively
     */
    private uploadDirectory;
    /**
     * Create remote directory (ignore already exists)
     */
    private sftpMkdir;
    /**
     * Download single file using fastGet for reliable transfer
     */
    private downloadFile;
    /**
     * Download directory recursively
     */
    private downloadDirectory;
    /**
     * Read remote directory
     */
    private sftpReaddir;
    /**
     * Close the SSH connection
     */
    close(): void;
    /**
     * Check if connection is active
     */
    get isConnected(): boolean;
}
//# sourceMappingURL=client.d.mts.map