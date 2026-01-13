import { VersError } from "../../core/error.mjs";
/**
 * Base class for SSH-related errors
 */
export declare class SSHError extends VersError {
    readonly cause: Error | undefined;
    constructor(message: string, cause?: Error);
}
/**
 * Error establishing TLS connection
 */
export declare class SSHTLSError extends SSHError {
    constructor(message: string, cause?: Error);
}
/**
 * Error during SSH handshake
 */
export declare class SSHHandshakeError extends SSHError {
    constructor(message: string, cause?: Error);
}
/**
 * Error during SSH authentication
 */
export declare class SSHAuthenticationError extends SSHError {
    constructor(message: string, cause?: Error);
}
/**
 * Connection timed out
 */
export declare class SSHTimeoutError extends SSHError {
    constructor(message?: string);
}
/**
 * Command execution failed
 */
export declare class SSHExecError extends SSHError {
    readonly exitCode: number;
    readonly stdout: string;
    readonly stderr: string;
    constructor(message: string, exitCode: number, stdout: string, stderr: string);
}
/**
 * SFTP operation failed
 */
export declare class SFTPError extends SSHError {
    constructor(message: string, cause?: Error);
}
//# sourceMappingURL=errors.d.mts.map