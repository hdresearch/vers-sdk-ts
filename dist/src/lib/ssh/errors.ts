import { VersError } from '../../core/error';

/**
 * Base class for SSH-related errors
 */
export class SSHError extends VersError {
  readonly cause: Error | undefined;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'SSHError';
    this.cause = cause;
  }
}

/**
 * Error establishing TLS connection
 */
export class SSHTLSError extends SSHError {
  constructor(message: string, cause?: Error) {
    super(`TLS connection failed: ${message}`, cause);
    this.name = 'SSHTLSError';
  }
}

/**
 * Error during SSH handshake
 */
export class SSHHandshakeError extends SSHError {
  constructor(message: string, cause?: Error) {
    super(`SSH handshake failed: ${message}`, cause);
    this.name = 'SSHHandshakeError';
  }
}

/**
 * Error during SSH authentication
 */
export class SSHAuthenticationError extends SSHError {
  constructor(message: string, cause?: Error) {
    super(`SSH authentication failed: ${message}`, cause);
    this.name = 'SSHAuthenticationError';
  }
}

/**
 * Connection timed out
 */
export class SSHTimeoutError extends SSHError {
  constructor(message: string = 'Connection timed out') {
    super(message);
    this.name = 'SSHTimeoutError';
  }
}

/**
 * Command execution failed
 */
export class SSHExecError extends SSHError {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;

  constructor(message: string, exitCode: number, stdout: string, stderr: string) {
    super(`${message} (exit code: ${exitCode})`);
    this.name = 'SSHExecError';
    this.exitCode = exitCode;
    this.stdout = stdout;
    this.stderr = stderr;
  }
}

/**
 * SFTP operation failed
 */
export class SFTPError extends SSHError {
  constructor(message: string, cause?: Error) {
    super(`SFTP error: ${message}`, cause);
    this.name = 'SFTPError';
  }
}
