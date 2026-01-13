"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFTPError = exports.SSHExecError = exports.SSHTimeoutError = exports.SSHAuthenticationError = exports.SSHHandshakeError = exports.SSHTLSError = exports.SSHError = exports.SSHClient = void 0;
var client_1 = require("./client.js");
Object.defineProperty(exports, "SSHClient", { enumerable: true, get: function () { return client_1.SSHClient; } });
var errors_1 = require("./errors.js");
Object.defineProperty(exports, "SSHError", { enumerable: true, get: function () { return errors_1.SSHError; } });
Object.defineProperty(exports, "SSHTLSError", { enumerable: true, get: function () { return errors_1.SSHTLSError; } });
Object.defineProperty(exports, "SSHHandshakeError", { enumerable: true, get: function () { return errors_1.SSHHandshakeError; } });
Object.defineProperty(exports, "SSHAuthenticationError", { enumerable: true, get: function () { return errors_1.SSHAuthenticationError; } });
Object.defineProperty(exports, "SSHTimeoutError", { enumerable: true, get: function () { return errors_1.SSHTimeoutError; } });
Object.defineProperty(exports, "SSHExecError", { enumerable: true, get: function () { return errors_1.SSHExecError; } });
Object.defineProperty(exports, "SFTPError", { enumerable: true, get: function () { return errors_1.SFTPError; } });
//# sourceMappingURL=index.js.map