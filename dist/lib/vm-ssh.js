"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSSH = withSSH;
const client_1 = require("./ssh/client.js");
// Cache for SSH keys (in-memory, per-process)
const keyCache = new Map();
/**
 * Get SSH connection info for a VM, with key caching.
 */
async function getConnectionInfo(vmResource, vmId) {
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
async function execute(vmResource, vmId, command, options) {
    const connectionInfo = await getConnectionInfo(vmResource, vmId);
    const client = new client_1.SSHClient(connectionInfo);
    try {
        return await client.execute(command, options);
    }
    finally {
        client.close();
    }
}
/**
 * Execute a command with streaming I/O.
 */
async function executeStream(vmResource, vmId, command, options) {
    const connectionInfo = await getConnectionInfo(vmResource, vmId);
    const client = new client_1.SSHClient(connectionInfo);
    try {
        return await client.executeStream(command, options);
    }
    finally {
        client.close();
    }
}
/**
 * Open an interactive shell session.
 */
async function connect(vmResource, vmId, options) {
    const connectionInfo = await getConnectionInfo(vmResource, vmId);
    const client = new client_1.SSHClient(connectionInfo);
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
async function upload(vmResource, vmId, localPath, remotePath, options) {
    const connectionInfo = await getConnectionInfo(vmResource, vmId);
    const client = new client_1.SSHClient(connectionInfo);
    try {
        return await client.upload(localPath, remotePath, options);
    }
    finally {
        client.close();
    }
}
/**
 * Download files from a VM via SFTP.
 */
async function download(vmResource, vmId, remotePath, localPath, options) {
    const connectionInfo = await getConnectionInfo(vmResource, vmId);
    const client = new client_1.SSHClient(connectionInfo);
    try {
        return await client.download(remotePath, localPath, options);
    }
    finally {
        client.close();
    }
}
/**
 * Get a reusable SSH client for multiple operations.
 */
async function getClient(vmResource, vmId, options) {
    const connectionInfo = await getConnectionInfo(vmResource, vmId);
    const client = new client_1.SSHClient(connectionInfo);
    await client.connect(options);
    return client;
}
/**
 * Clear cached SSH key(s).
 */
function clearKeyCache(vmId) {
    if (vmId) {
        keyCache.delete(vmId);
    }
    else {
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
function withSSH(vmResource) {
    return Object.assign(vmResource, {
        execute: (vmId, command, options) => execute(vmResource, vmId, command, options),
        executeStream: (vmId, command, options) => executeStream(vmResource, vmId, command, options),
        connect: (vmId, options) => connect(vmResource, vmId, options),
        upload: (vmId, localPath, remotePath, options) => upload(vmResource, vmId, localPath, remotePath, options),
        download: (vmId, remotePath, localPath, options) => download(vmResource, vmId, remotePath, localPath, options),
        getClient: (vmId, options) => getClient(vmResource, vmId, options),
        clearKeyCache,
    });
}
//# sourceMappingURL=vm-ssh.js.map