// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { buildHeaders } from "../internal/headers.mjs";
import { path } from "../internal/utils/path.mjs";
export class VmResource extends APIResource {
    list(options) {
        return this._client.get('/vms', options);
    }
    delete(vmID, params = {}, options) {
        const { skip_wait_boot } = params ?? {};
        return this._client.delete(path `/vm/${vmID}`, { query: { skip_wait_boot }, ...options });
    }
    branch(vmID, options) {
        return this._client.post(path `/vm/${vmID}/branch`, options);
    }
    commit(vmID, params = {}, options) {
        const { keep_paused, skip_wait_boot } = params ?? {};
        return this._client.post(path `/vm/${vmID}/commit`, {
            query: { keep_paused, skip_wait_boot },
            ...options,
        });
    }
    createRoot(params, options) {
        const { wait_boot, ...body } = params;
        return this._client.post('/vm/new_root', { query: { wait_boot }, body, ...options });
    }
    getSSHKey(vmID, options) {
        return this._client.get(path `/vm/${vmID}/ssh_key`, options);
    }
    restoreFromCommit(body, options) {
        return this._client.post('/vm/from_commit', { body, ...options });
    }
    updateState(vmID, params, options) {
        const { skip_wait_boot, ...body } = params;
        return this._client.patch(path `/vm/${vmID}/state`, {
            query: { skip_wait_boot },
            body,
            ...options,
            headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
        });
    }
}
//# sourceMappingURL=vm.mjs.map