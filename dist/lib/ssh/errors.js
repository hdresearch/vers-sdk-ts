"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFTPError = exports.SSHExecError = exports.SSHTimeoutError = exports.SSHAuthenticationError = exports.SSHHandshakeError = exports.SSHTLSError = exports.SSHError = void 0;
const error_1 = require("../../core/error.js");
/**
 * Base class for SSH-related errors
 */
class SSHError extends error_1.VersError {
    constructor(message, cause) {
        super(message);
        this.name = 'SSHError';
        this.cause = cause;
    }
}
exports.SSHError = SSHError;
/**
 * Error establishing TLS connection
 */
class SSHTLSError extends SSHError {
    constructor(message, cause) {
        super(`TLS connection failed: ${message}`, cause);
        this.name = 'SSHTLSError';
    }
}
exports.SSHTLSError = SSHTLSError;
/**
 * Error during SSH handshake
 */
class SSHHandshakeError extends SSHError {
    constructor(message, cause) {
        super(`SSH handshake failed: ${message}`, cause);
        this.name = 'SSHHandshakeError';
    }
}
exports.SSHHandshakeError = SSHHandshakeError;
/**
 * Error during SSH authentication
 */
class SSHAuthenticationError extends SSHError {
    constructor(message, cause) {
        super(`SSH authentication failed: ${message}`, cause);
        this.name = 'SSHAuthenticationError';
    }
}
exports.SSHAuthenticationError = SSHAuthenticationError;
/**
 * Connection timed out
 */
class SSHTimeoutError extends SSHError {
    constructor(message = 'Connection timed out') {
        super(message);
        this.name = 'SSHTimeoutError';
    }
}
exports.SSHTimeoutError = SSHTimeoutError;
/**
 * Command execution failed
 */
class SSHExecError extends SSHError {
    constructor(message, exitCode, stdout, stderr) {
        super(`${message} (exit code: ${exitCode})`);
        this.name = 'SSHExecError';
        this.exitCode = exitCode;
        this.stdout = stdout;
        this.stderr = stderr;
    }
}
exports.SSHExecError = SSHExecError;
/**
 * SFTP operation failed
 */
class SFTPError extends SSHError {
    constructor(message, cause) {
        super(`SFTP error: ${message}`, cause);
        this.name = 'SFTPError';
    }
}
exports.SFTPError = SFTPError;
//# sourceMappingURL=errors.js.map