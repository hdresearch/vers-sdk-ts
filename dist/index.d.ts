export { Vers as default } from "./client.js";
export { type Uploadable, toFile } from "./core/uploads.js";
export { APIPromise } from "./core/api-promise.js";
export { Vers, type ClientOptions } from "./client.js";
export { VersError, APIError, APIConnectionError, APIConnectionTimeoutError, APIUserAbortError, NotFoundError, ConflictError, RateLimitError, BadRequestError, AuthenticationError, InternalServerError, PermissionDeniedError, UnprocessableEntityError, } from "./core/error.js";
export { withSSH, type VmResourceWithSSH } from "./lib/vm-ssh.js";
export { SSHClient } from "./lib/ssh/index.js";
export { SSHError, SSHTLSError, SSHHandshakeError, SSHAuthenticationError, SSHTimeoutError, SSHExecError, SFTPError, } from "./lib/ssh/index.js";
export type { SSHOptions, ExecuteOptions, ExecuteResult, ExecuteStreamOptions, ConnectOptions, ShellSession, SFTPOptions, TransferResult, } from "./lib/ssh/index.js";
//# sourceMappingURL=index.d.ts.map