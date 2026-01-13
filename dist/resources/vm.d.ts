import { APIResource } from "../core/resource.js";
import { APIPromise } from "../core/api-promise.js";
import { RequestOptions } from "../internal/request-options.js";
export declare class VmResource extends APIResource {
    list(options?: RequestOptions): APIPromise<VmListResponse>;
    delete(vmID: string, params?: VmDeleteParams | null | undefined, options?: RequestOptions): APIPromise<VmDeleteResponse>;
    branch(vmID: string, options?: RequestOptions): APIPromise<NewVmResponse>;
    commit(vmID: string, params?: VmCommitParams | null | undefined, options?: RequestOptions): APIPromise<VmCommitResponse>;
    createRoot(params: VmCreateRootParams, options?: RequestOptions): APIPromise<NewVmResponse>;
    getSSHKey(vmID: string, options?: RequestOptions): APIPromise<VmSSHKeyResponse>;
    restoreFromCommit(body: VmRestoreFromCommitParams, options?: RequestOptions): APIPromise<NewVmResponse>;
    updateState(vmID: string, params: VmUpdateStateParams, options?: RequestOptions): APIPromise<void>;
}
export interface ErrorResponse {
    /**
     * Reason of error
     */
    error?: string;
    /**
     * Is always: false
     */
    success?: boolean;
}
export interface NewRootRequest {
    /**
     * Struct representing configuration options common to all VMs
     */
    vm_config: NewRootRequest.VmConfig;
}
export declare namespace NewRootRequest {
    /**
     * Struct representing configuration options common to all VMs
     */
    interface VmConfig {
        /**
         * The disk size, in MiB.
         */
        fs_size_mib?: number | null;
        /**
         * The filesystem base image name. Currently, must be 'default'
         */
        image_name?: string | null;
        /**
         * The kernel name. Currently, must be 'default.bin'
         */
        kernel_name?: string | null;
        /**
         * The RAM size, in MiB.
         */
        mem_size_mib?: number | null;
        /**
         * How many vCPUs to allocate to this VM (and its children)
         */
        vcpu_count?: number | null;
    }
}
/**
 * Response body for new VM requests (new_root, from_commit, branch)
 */
export interface NewVmResponse {
    vm_id: string;
}
export interface Vm {
    created_at: string;
    owner_id: string;
    /**
     * The parent VM ID if this VM was branched
     */
    parent?: string | null;
    /**
     * The state of a VM
     */
    state: 'booting' | 'running' | 'paused';
    vm_id: string;
}
/**
 * The response body for POST /api/vm/{vm_id}/commit
 */
export interface VmCommitResponse {
    /**
     * The UUID of the newly-created commit
     */
    commit_id: string;
}
/**
 * Response body for DELETE /api/vm/{vm_id}
 */
export interface VmDeleteResponse {
    vm_id: string;
}
/**
 * Request body for POST /api/vm/from_commit
 */
export interface VmFromCommitRequest {
    commit_id: string;
}
/**
 * Response body for GET /api/vm/{vm_id}/ssh_key
 */
export interface VmSSHKeyResponse {
    /**
     * The SSH port that will be DNAT'd to the VM's netns (and, in turn, to its TAP
     * device)
     */
    ssh_port: number;
    /**
     * Private SSH key in stringified OpenSSH format
     */
    ssh_private_key: string;
}
/**
 * Request body for PATCH /api/vm/{vm_id}/state
 */
export interface VmUpdateStateRequest {
    /**
     * The requested state for the VM
     */
    state: 'Paused' | 'Running';
}
export type VmListResponse = Array<Vm>;
export interface VmDeleteParams {
    /**
     * If true, return an error immediately if the VM is still booting. Default: false
     */
    skip_wait_boot?: boolean;
}
export interface VmCommitParams {
    /**
     * If true, keep VM paused after commit
     */
    keep_paused?: boolean;
    /**
     * If true, return an error immediately if the VM is still booting. Default: false
     */
    skip_wait_boot?: boolean;
}
export interface VmCreateRootParams {
    /**
     * Body param: Struct representing configuration options common to all VMs
     */
    vm_config: VmCreateRootParams.VmConfig;
    /**
     * Query param: If true, wait for the newly-created VM to finish booting before
     * returning. Default: false.
     */
    wait_boot?: boolean;
}
export declare namespace VmCreateRootParams {
    /**
     * Struct representing configuration options common to all VMs
     */
    interface VmConfig {
        /**
         * The disk size, in MiB.
         */
        fs_size_mib?: number | null;
        /**
         * The filesystem base image name. Currently, must be 'default'
         */
        image_name?: string | null;
        /**
         * The kernel name. Currently, must be 'default.bin'
         */
        kernel_name?: string | null;
        /**
         * The RAM size, in MiB.
         */
        mem_size_mib?: number | null;
        /**
         * How many vCPUs to allocate to this VM (and its children)
         */
        vcpu_count?: number | null;
    }
}
export interface VmRestoreFromCommitParams {
    commit_id: string;
}
export interface VmUpdateStateParams {
    /**
     * Body param: The requested state for the VM
     */
    state: 'Paused' | 'Running';
    /**
     * Query param: If true, error immediately if the VM is not finished booting.
     * Defaults to false
     */
    skip_wait_boot?: boolean;
}
export declare namespace VmResource {
    export { type ErrorResponse as ErrorResponse, type NewRootRequest as NewRootRequest, type NewVmResponse as NewVmResponse, type Vm as Vm, type VmCommitResponse as VmCommitResponse, type VmDeleteResponse as VmDeleteResponse, type VmFromCommitRequest as VmFromCommitRequest, type VmSSHKeyResponse as VmSSHKeyResponse, type VmUpdateStateRequest as VmUpdateStateRequest, type VmListResponse as VmListResponse, type VmDeleteParams as VmDeleteParams, type VmCommitParams as VmCommitParams, type VmCreateRootParams as VmCreateRootParams, type VmRestoreFromCommitParams as VmRestoreFromCommitParams, type VmUpdateStateParams as VmUpdateStateParams, };
}
//# sourceMappingURL=vm.d.ts.map