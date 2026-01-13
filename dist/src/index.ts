// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export { Vers as default } from './client';

export { type Uploadable, toFile } from './core/uploads';
export { APIPromise } from './core/api-promise';
export { Vers, type ClientOptions } from './client';
export {
  VersError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './core/error';

// SSH functionality
export { withSSH, type VmResourceWithSSH } from './lib/vm-ssh';
export { SSHClient } from './lib/ssh';
export {
  SSHError,
  SSHTLSError,
  SSHHandshakeError,
  SSHAuthenticationError,
  SSHTimeoutError,
  SSHExecError,
  SFTPError,
} from './lib/ssh';
export type {
  SSHOptions,
  ExecuteOptions,
  ExecuteResult,
  ExecuteStreamOptions,
  ConnectOptions,
  ShellSession,
  SFTPOptions,
  TransferResult,
} from './lib/ssh';
