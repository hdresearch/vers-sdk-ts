import * as tls from 'node:tls';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Client as SSH2Client } from 'ssh2';
import { SSHError, SSHTLSError, SSHHandshakeError, SSHAuthenticationError, SSHTimeoutError, SFTPError, } from "./errors.mjs";
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
    constructor(connectionInfo, options = {}) {
        this.client = null;
        this.keepAliveTimer = null;
        this.missedKeepalives = 0;
        this.connectionInfo = connectionInfo;
        this.options = options;
    }
    /**
     * Get the hostname for TLS/SSH connection
     */
    get hostname() {
        return this.connectionInfo.hostname;
    }
    /**
     * Establish SSH connection over TLS
     */
    async connect(options = {}) {
        if (this.client) {
            return this.client;
        }
        const mergedOptions = { ...this.options, ...options };
        const { timeout = DEFAULT_TIMEOUT, keepAliveInterval = DEFAULT_KEEPALIVE_INTERVAL, keepAliveMaxCount = DEFAULT_KEEPALIVE_MAX_COUNT, } = mergedOptions;
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
    createTLSConnection(timeout) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new SSHTimeoutError('TLS connection timed out'));
            }, timeout);
            const socket = tls.connect({
                host: this.hostname,
                port: 443,
                servername: this.hostname, // SNI
                rejectUnauthorized: false, // Matches Go InsecureSkipVerify
                minVersion: 'TLSv1.2',
            }, () => {
                clearTimeout(timeoutId);
                resolve(socket);
            });
            socket.on('error', (err) => {
                clearTimeout(timeoutId);
                reject(new SSHTLSError(err.message, err));
            });
        });
    }
    /**
     * Perform SSH handshake over TLS socket
     */
    performSSHHandshake(tlsSocket, timeout) {
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
                }
                else {
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
    startKeepAlive(client, interval, maxCount) {
        this.missedKeepalives = 0;
        this.keepAliveTimer = setInterval(() => {
            // Send keepalive@openssh.com request
            client.exec('true', (err) => {
                if (err) {
                    this.missedKeepalives++;
                    if (this.missedKeepalives >= maxCount) {
                        this.close();
                    }
                }
                else {
                    this.missedKeepalives = 0;
                }
            });
        }, interval);
    }
    /**
     * Execute a command and return the result
     */
    async execute(command, options = {}) {
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
                stream.on('data', (data) => {
                    stdout += data.toString();
                });
                stream.stderr.on('data', (data) => {
                    stderr += data.toString();
                });
                stream.on('close', (code) => {
                    options.signal?.removeEventListener('abort', abortHandler);
                    resolve({ stdout, stderr, exitCode: code ?? 0 });
                });
                stream.on('error', (streamErr) => {
                    options.signal?.removeEventListener('abort', abortHandler);
                    reject(new SSHError(`Stream error: ${streamErr.message}`, streamErr));
                });
            });
        });
    }
    /**
     * Execute with streaming I/O
     */
    async executeStream(command, options = {}) {
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
                stream.on('close', (code) => {
                    options.signal?.removeEventListener('abort', abortHandler);
                    resolve(code ?? 0);
                });
                stream.on('error', (streamErr) => {
                    options.signal?.removeEventListener('abort', abortHandler);
                    reject(new SSHError(`Stream error: ${streamErr.message}`, streamErr));
                });
            });
        });
    }
    /**
     * Open interactive shell session
     */
    async shell(options = {}) {
        const client = await this.connect(options);
        const { term = 'xterm-256color', cols = 80, rows = 24 } = options;
        return new Promise((resolve, reject) => {
            if (options.signal?.aborted) {
                reject(new SSHError('Operation aborted'));
                return;
            }
            client.shell({
                term,
                cols,
                rows,
                modes: {
                    ECHO: 1,
                    TTY_OP_ISPEED: 14400,
                    TTY_OP_OSPEED: 14400,
                },
            }, (err, stream) => {
                if (err) {
                    reject(new SSHError(`Failed to open shell: ${err.message}`, err));
                    return;
                }
                let exitCode = 0;
                const closePromise = new Promise((resolveClose) => {
                    stream.on('close', (code) => {
                        exitCode = code ?? 0;
                        resolveClose(exitCode);
                    });
                });
                const session = {
                    stdin: stream,
                    stdout: stream,
                    stderr: stream.stderr,
                    resize: (newCols, newRows) => {
                        stream.setWindow(newRows, newCols, 0, 0);
                    },
                    close: async () => {
                        stream.end();
                        stream.destroy();
                    },
                    wait: () => closePromise,
                };
                // Handle abort signal
                options.signal?.addEventListener('abort', () => {
                    session.close();
                }, { once: true });
                resolve(session);
            });
        });
    }
    /**
     * Upload file or directory via SFTP
     */
    async upload(localPath, remotePath, options = {}) {
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
    async download(remotePath, localPath, options = {}) {
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
    getSFTP(client) {
        return new Promise((resolve, reject) => {
            client.sftp((err, sftp) => {
                if (err) {
                    reject(new SFTPError(`Failed to open SFTP: ${err.message}`, err));
                }
                else {
                    resolve(sftp);
                }
            });
        });
    }
    /**
     * Stat a remote path via SFTP
     */
    sftpStat(sftp, remotePath) {
        return new Promise((resolve, reject) => {
            sftp.stat(remotePath, (err, stats) => {
                if (err) {
                    reject(new SFTPError(`Failed to stat remote path: ${err.message}`, err));
                }
                else {
                    resolve(stats);
                }
            });
        });
    }
    /**
     * Upload single file using fastPut for reliable transfer
     */
    async uploadFile(sftp, localPath, remotePath, options) {
        const stats = await fs.promises.stat(localPath);
        const fileSize = stats.size;
        return new Promise((resolve, reject) => {
            sftp.fastPut(localPath, remotePath, {
                step: (transferred, _chunk, total) => {
                    options.onProgress?.(transferred, total, localPath);
                },
            }, (err) => {
                if (err) {
                    reject(new SFTPError(`Failed to upload file: ${err.message}`, err));
                }
                else {
                    resolve({ filesTransferred: 1, bytesTransferred: fileSize });
                }
            });
        });
    }
    /**
     * Upload directory recursively
     */
    async uploadDirectory(sftp, localDir, remoteDir, options) {
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
            }
            else {
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
    sftpMkdir(sftp, remotePath) {
        return new Promise((resolve, reject) => {
            sftp.mkdir(remotePath, (err) => {
                // Ignore "already exists" errors (code 4 in SFTP)
                if (err && err.code !== 4) {
                    reject(new SFTPError(`Failed to create directory: ${err.message}`, err));
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     * Download single file using fastGet for reliable transfer
     */
    async downloadFile(sftp, remotePath, localPath, options) {
        // Ensure parent directory exists
        await fs.promises.mkdir(path.dirname(localPath), { recursive: true });
        // Get remote file size for progress tracking
        const stats = await this.sftpStat(sftp, remotePath);
        const fileSize = stats.size;
        return new Promise((resolve, reject) => {
            sftp.fastGet(remotePath, localPath, {
                step: (transferred, _chunk, total) => {
                    options.onProgress?.(transferred, total, remotePath);
                },
            }, (err) => {
                if (err) {
                    reject(new SFTPError(`Failed to download file: ${err.message}`, err));
                }
                else {
                    resolve({ filesTransferred: 1, bytesTransferred: fileSize });
                }
            });
        });
    }
    /**
     * Download directory recursively
     */
    async downloadDirectory(sftp, remoteDir, localDir, options) {
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
            }
            else {
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
    sftpReaddir(sftp, remotePath) {
        return new Promise((resolve, reject) => {
            sftp.readdir(remotePath, (err, list) => {
                if (err) {
                    reject(new SFTPError(`Failed to read directory: ${err.message}`, err));
                }
                else {
                    resolve(list);
                }
            });
        });
    }
    /**
     * Close the SSH connection
     */
    close() {
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
    get isConnected() {
        return this.client !== null;
    }
}
//# sourceMappingURL=client.mjs.map