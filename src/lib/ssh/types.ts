import type { Readable, Writable } from 'node:stream';

/**
 * Options for SSH operations
 */
export interface SSHOptions {
  /** Connection timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Keep-alive interval in milliseconds (default: 10000) */
  keepAliveInterval?: number;
  /** Max missed keep-alives before disconnect (default: 6) */
  keepAliveMaxCount?: number;
}

/**
 * Options for command execution
 */
export interface ExecuteOptions extends SSHOptions {
  /** Environment variables to set */
  env?: Record<string, string>;
  /** Working directory */
  cwd?: string;
  /** Signal to abort the operation */
  signal?: AbortSignal;
}

/**
 * Result from command execution
 */
export interface ExecuteResult {
  /** Combined stdout output */
  stdout: string;
  /** Combined stderr output */
  stderr: string;
  /** Exit code (0 = success) */
  exitCode: number;
}

/**
 * Options for streaming execution
 */
export interface ExecuteStreamOptions extends ExecuteOptions {
  /** Stream to write stdout to */
  stdout?: Writable;
  /** Stream to write stderr to */
  stderr?: Writable;
  /** Stream to read stdin from */
  stdin?: Readable;
}

/**
 * Options for interactive shell
 */
export interface ConnectOptions extends SSHOptions {
  /** Terminal type (default: xterm-256color) */
  term?: string;
  /** Terminal columns (default: 80) */
  cols?: number;
  /** Terminal rows (default: 24) */
  rows?: number;
  /** Signal to abort the session */
  signal?: AbortSignal;
}

/**
 * Interactive shell session
 */
export interface ShellSession {
  /** Stdin stream to write to */
  stdin: Writable;
  /** Stdout stream to read from */
  stdout: Readable;
  /** Stderr stream to read from */
  stderr: Readable;
  /** Resize the terminal */
  resize(cols: number, rows: number): void;
  /** Close the session */
  close(): Promise<void>;
  /** Wait for session to end, returns exit code */
  wait(): Promise<number>;
}

/**
 * Options for SFTP operations
 */
export interface SFTPOptions extends SSHOptions {
  /** Recursively transfer directories */
  recursive?: boolean;
  /** Preserve file permissions */
  preservePermissions?: boolean;
  /** Progress callback */
  onProgress?: (transferred: number, total: number, filename: string) => void;
  /** Signal to abort the operation */
  signal?: AbortSignal;
}

/**
 * Result from file transfer
 */
export interface TransferResult {
  /** Number of files transferred */
  filesTransferred: number;
  /** Total bytes transferred */
  bytesTransferred: number;
}

/**
 * Internal connection info used by SSHClient
 */
export interface SSHConnectionInfo {
  vmId: string;
  privateKey: string;
  hostname: string;
  port: number;
}
