// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class VmResource extends APIResource {
  list(options?: RequestOptions): APIPromise<VmListResponse> {
    return this._client.get('/api/v1/vms', options);
  }

  delete(
    vmID: string,
    params: VmDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VmDeleteResponse> {
    const { skip_wait_boot } = params ?? {};
    return this._client.delete(path`/api/v1/vm/${vmID}`, { query: { skip_wait_boot }, ...options });
  }

  branch(
    vmOrCommitID: string,
    params: VmBranchParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count, keep_paused, skip_wait_boot } = params ?? {};
    return this._client.post(path`/api/v1/vm/${vmOrCommitID}/branch`, {
      query: { count, keep_paused, skip_wait_boot },
      ...options,
    });
  }

  branchByCommit(
    commitID: string,
    params: VmBranchByCommitParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count } = params ?? {};
    return this._client.post(path`/api/v1/vm/branch/by_commit/${commitID}`, { query: { count }, ...options });
  }

  branchByVm(
    vmID: string,
    params: VmBranchByVmParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count, keep_paused, skip_wait_boot } = params ?? {};
    return this._client.post(path`/api/v1/vm/branch/by_vm/${vmID}`, {
      query: { count, keep_paused, skip_wait_boot },
      ...options,
    });
  }

  commit(
    vmID: string,
    params: VmCommitParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VmCommitResponse> {
    const { keep_paused, skip_wait_boot } = params ?? {};
    return this._client.post(path`/api/v1/vm/${vmID}/commit`, {
      query: { keep_paused, skip_wait_boot },
      ...options,
    });
  }

  createRoot(params: VmCreateRootParams, options?: RequestOptions): APIPromise<NewVmResponse> {
    const { wait_boot, ...body } = params;
    return this._client.post('/api/v1/vm/new_root', { query: { wait_boot }, body, ...options });
  }

  getSSHKey(vmID: string, options?: RequestOptions): APIPromise<VmSSHKeyResponse> {
    return this._client.get(path`/api/v1/vm/${vmID}/ssh_key`, options);
  }

  restoreFromCommit(body: VmRestoreFromCommitParams, options?: RequestOptions): APIPromise<NewVmResponse> {
    return this._client.post('/api/v1/vm/from_commit', { body, ...options });
  }

  status(vmID: string, options?: RequestOptions): APIPromise<Vm> {
    return this._client.get(path`/api/v1/vm/${vmID}/status`, options);
  }

  updateState(vmID: string, params: VmUpdateStateParams, options?: RequestOptions): APIPromise<void> {
    const { skip_wait_boot, ...body } = params;
    return this._client.patch(path`/api/v1/vm/${vmID}/state`, {
      query: { skip_wait_boot },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
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

export namespace NewRootRequest {
  /**
   * Struct representing configuration options common to all VMs
   */
  export interface VmConfig {
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

export interface NewVmsResponse {
  vms: Array<NewVmResponse>;
}

export interface Vm {
  created_at: string;

  owner_id: string;

  /**
   * The state of a VM
   */
  state: 'booting' | 'running' | 'paused' | 'sleeping';

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
 * Request body for POST /api/v1/vm/from_commit
 */
export type VmFromCommitRequest = VmFromCommitRequest.CommitID | VmFromCommitRequest.TagName;

export namespace VmFromCommitRequest {
  /**
   * The commit ID to restore from (exactly one of commit_id or tag_name must be
   * provided)
   */
  export interface CommitID {
    /**
     * The commit ID to restore from (exactly one of commit_id or tag_name must be
     * provided)
     */
    commit_id: string;
  }

  /**
   * The tag name to restore from (exactly one of commit_id or tag_name must be
   * provided)
   */
  export interface TagName {
    /**
     * The tag name to restore from (exactly one of commit_id or tag_name must be
     * provided)
     */
    tag_name: string;
  }
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

export interface VmBranchParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;

  /**
   * If true, keep VM paused after commit. Only applicable when branching a VM ID.
   */
  keep_paused?: boolean;

  /**
   * If true, immediately return an error if VM is booting instead of waiting. Only
   * applicable when branching a VM ID.
   */
  skip_wait_boot?: boolean;
}

export interface VmBranchByCommitParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;
}

export interface VmBranchByVmParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;

  /**
   * If true, keep VM paused after commit
   */
  keep_paused?: boolean;

  /**
   * If true, immediately return an error if VM is booting instead of waiting
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

export namespace VmCreateRootParams {
  /**
   * Struct representing configuration options common to all VMs
   */
  export interface VmConfig {
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

export type VmRestoreFromCommitParams =
  | VmRestoreFromCommitParams.Variant0
  | VmRestoreFromCommitParams.Variant1;

export declare namespace VmRestoreFromCommitParams {
  export interface Variant0 {
    /**
     * The commit ID to restore from (exactly one of commit_id or tag_name must be
     * provided)
     */
    commit_id: string;
  }

  export interface Variant1 {
    /**
     * The tag name to restore from (exactly one of commit_id or tag_name must be
     * provided)
     */
    tag_name: string;
  }
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
  export {
    type ErrorResponse as ErrorResponse,
    type NewRootRequest as NewRootRequest,
    type NewVmResponse as NewVmResponse,
    type NewVmsResponse as NewVmsResponse,
    type Vm as Vm,
    type VmCommitResponse as VmCommitResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmFromCommitRequest as VmFromCommitRequest,
    type VmSSHKeyResponse as VmSSHKeyResponse,
    type VmUpdateStateRequest as VmUpdateStateRequest,
    type VmListResponse as VmListResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
    type VmBranchByCommitParams as VmBranchByCommitParams,
    type VmBranchByVmParams as VmBranchByVmParams,
    type VmCommitParams as VmCommitParams,
    type VmCreateRootParams as VmCreateRootParams,
    type VmRestoreFromCommitParams as VmRestoreFromCommitParams,
    type VmUpdateStateParams as VmUpdateStateParams,
  };
}
