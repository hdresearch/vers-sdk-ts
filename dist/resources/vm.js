"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VmResource = void 0;
const resource_1 = require("../core/resource.js");
const headers_1 = require("../internal/headers.js");
const path_1 = require("../internal/utils/path.js");
class VmResource extends resource_1.APIResource {
    list(options) {
        return this._client.get('/vms', options);
    }
    delete(vmID, params = {}, options) {
        const { skip_wait_boot } = params ?? {};
        return this._client.delete((0, path_1.path) `/vm/${vmID}`, { query: { skip_wait_boot }, ...options });
    }
    branch(vmID, options) {
        return this._client.post((0, path_1.path) `/vm/${vmID}/branch`, options);
    }
    commit(vmID, params = {}, options) {
        const { keep_paused, skip_wait_boot } = params ?? {};
        return this._client.post((0, path_1.path) `/vm/${vmID}/commit`, {
            query: { keep_paused, skip_wait_boot },
            ...options,
        });
    }
    createRoot(params, options) {
        const { wait_boot, ...body } = params;
        return this._client.post('/vm/new_root', { query: { wait_boot }, body, ...options });
    }
    getSSHKey(vmID, options) {
        return this._client.get((0, path_1.path) `/vm/${vmID}/ssh_key`, options);
    }
    restoreFromCommit(body, options) {
        return this._client.post('/vm/from_commit', { body, ...options });
    }
    updateState(vmID, params, options) {
        const { skip_wait_boot, ...body } = params;
        return this._client.patch((0, path_1.path) `/vm/${vmID}/state`, {
            query: { skip_wait_boot },
            body,
            ...options,
            headers: (0, headers_1.buildHeaders)([{ Accept: '*/*' }, options?.headers]),
        });
    }
}
exports.VmResource = VmResource;
//# sourceMappingURL=vm.js.map