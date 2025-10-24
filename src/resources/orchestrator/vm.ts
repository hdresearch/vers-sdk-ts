// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Vm extends APIResource {
  delete(vmID: string, options?: RequestOptions): APIPromise<VmDeleteResponse> {
    return this._client.delete(path`/vm/${vmID}`, options);
  }

  branch(vmID: string, options?: RequestOptions): APIPromise<NewVmResponse> {
    return this._client.post(path`/vm/${vmID}/branch`, options);
  }

  commit(vmID: string, options?: RequestOptions): APIPromise<VmCommitResponse> {
    return this._client.post(path`/vm/${vmID}/commit`, options);
  }

  createRoot(body: VmCreateRootParams, options?: RequestOptions): APIPromise<NewVmResponse> {
    return this._client.post('/vm/new_root', { body, ...options });
  }

  restoreFromCommit(body: VmRestoreFromCommitParams, options?: RequestOptions): APIPromise<NewVmResponse> {
    return this._client.post('/vm/from_commit', { body, ...options });
  }

  updateState(vmID: string, body: VmUpdateStateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/vm/${vmID}/state`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
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

export interface NewVmResponse {
  /**
   * The VM ID, a (v4) UUID
   */
  id: string;
}

/**
 * Response body for POST /api/vm/{vm_id}/branch
 */
export interface VmBranchResponse {
  /**
   * The ID of the newly-created VM, a (v4) UUID
   */
  vm_id: string;
}

/**
 * The response body for POST /api/vm/{vm_id}/commit
 */
export interface VmCommitResponse {
  /**
   * The commit ID, a (v4) UUID
   */
  commit_id: string;

  /**
   * The host architecture, eg: "x86_64" (currently implemented with `uname -m``)
   */
  host_architecture: string;
}

/**
 * Response body for DELETE /api/vm/{vm_id}
 */
export interface VmDeleteResponse {
  deleted_ids: Array<string>;
}

/**
 * Request body for POST /api/vm/from_commit
 */
export interface VmFromCommitRequest {
  commit_id: string;
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

export interface VmCreateRootParams {
  /**
   * Struct representing configuration options common to all VMs
   */
  vm_config: VmCreateRootParams.VmConfig;
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

export interface VmRestoreFromCommitParams {
  commit_id: string;
}

export interface VmUpdateStateParams {
  /**
   * The requested state for the VM
   */
  state: 'Paused' | 'Running';
}

export declare namespace Vm {
  export {
    type NewRootRequest as NewRootRequest,
    type NewVmResponse as NewVmResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmFromCommitRequest as VmFromCommitRequest,
    type VmUpdateStateRequest as VmUpdateStateRequest,
    type VmCreateRootParams as VmCreateRootParams,
    type VmRestoreFromCommitParams as VmRestoreFromCommitParams,
    type VmUpdateStateParams as VmUpdateStateParams,
  };
}
