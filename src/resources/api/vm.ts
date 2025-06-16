// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class VmResource extends APIResource {
  /**
   * Retrieve information on a particular VM.
   */
  retrieve(vmIDOrAlias: string, options?: RequestOptions): APIPromise<VmRetrieveResponse> {
    return this._client.get(path`/api/vm/${vmIDOrAlias}`, options);
  }

  /**
   * Update VM state.
   */
  update(vmIDOrAlias: string, body: VmUpdateParams, options?: RequestOptions): APIPromise<VmUpdateResponse> {
    return this._client.patch(path`/api/vm/${vmIDOrAlias}`, { body, ...options });
  }

  /**
   * List all VMs.
   */
  list(options?: RequestOptions): APIPromise<VmListResponse> {
    return this._client.get('/api/vm', options);
  }

  /**
   * Delete a VM.
   */
  delete(
    vmIDOrAlias: string,
    params: VmDeleteParams,
    options?: RequestOptions,
  ): APIPromise<VmDeleteResponse> {
    const { recursive } = params;
    return this._client.delete(path`/api/vm/${vmIDOrAlias}`, { query: { recursive }, ...options });
  }

  /**
   * Branch a VM.
   */
  branch(vmIDOrAlias: string, body: VmBranchParams, options?: RequestOptions): APIPromise<VmBranchResponse> {
    return this._client.post(path`/api/vm/${vmIDOrAlias}/branch`, { body, ...options });
  }

  /**
   * Commit a VM.
   */
  commit(vmIDOrAlias: string, options?: RequestOptions): APIPromise<VmCommitResponse> {
    return this._client.post(path`/api/vm/${vmIDOrAlias}/commit`, options);
  }

  /**
   * Get the SSH private key for VM access
   */
  getSSHKey(vmIDOrAlias: string, options?: RequestOptions): APIPromise<VmGetSSHKeyResponse> {
    return this._client.get(path`/api/vm/${vmIDOrAlias}/ssh_key`, options);
  }
}

export interface BranchRequest {
  alias?: string | null;
}

export interface UpdateVm {
  alias?: string | null;

  state?: 'Running' | 'Paused' | null;
}

export interface Vm {
  /**
   * The ID of the VM.
   */
  id: string;

  /**
   * The IDs of direct children branched from this VM.
   */
  children: Array<string>;

  /**
   * The VM's cluster ID
   */
  cluster_id: string;

  /**
   * The VM's local IP address on the VM subnet
   */
  ip_address: string;

  /**
   * The VM's network configuration
   */
  network_info: Vm.NetworkInfo;

  /**
   * Whether the VM is running, paused, or not started.
   */
  state: 'Not started' | 'Running' | 'Paused';

  /**
   * Human-readable name assigned to the VM.
   */
  alias?: string | null;

  /**
   * The parent VM's ID, if present. If None, then this VM is a root VM.
   */
  parent_id?: string | null;
}

export namespace Vm {
  /**
   * The VM's network configuration
   */
  export interface NetworkInfo {
    guest_ip: string;

    guest_mac: string;

    ssh_port: number;

    tap0_ip: string;

    tap0_name: string;

    vm_namespace: string;
  }
}

export interface VmRetrieveResponse {
  data: VmRetrieveResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmRetrieveResponse {
  export interface Data {
    /**
     * The ID of the VM.
     */
    id: string;

    /**
     * The IDs of direct children branched from this VM.
     */
    children: Array<string>;

    /**
     * The VM's cluster ID
     */
    cluster_id: string;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * Human-readable name assigned to the VM.
     */
    alias?: string | null;

    /**
     * The parent VM's ID, if present. If None, then this VM is a root VM.
     */
    parent_id?: string | null;
  }

  export namespace Data {
    /**
     * The VM's network configuration
     */
    export interface NetworkInfo {
      guest_ip: string;

      guest_mac: string;

      ssh_port: number;

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface VmUpdateResponse {
  data: VmUpdateResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmUpdateResponse {
  export interface Data {
    /**
     * The ID of the VM.
     */
    id: string;

    /**
     * The IDs of direct children branched from this VM.
     */
    children: Array<string>;

    /**
     * The VM's cluster ID
     */
    cluster_id: string;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * Human-readable name assigned to the VM.
     */
    alias?: string | null;

    /**
     * The parent VM's ID, if present. If None, then this VM is a root VM.
     */
    parent_id?: string | null;
  }

  export namespace Data {
    /**
     * The VM's network configuration
     */
    export interface NetworkInfo {
      guest_ip: string;

      guest_mac: string;

      ssh_port: number;

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface VmListResponse {
  data: Array<VmListResponse.Data>;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmListResponse {
  export interface Data {
    /**
     * The ID of the VM.
     */
    id: string;

    /**
     * The IDs of direct children branched from this VM.
     */
    children: Array<string>;

    /**
     * The VM's cluster ID
     */
    cluster_id: string;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * Human-readable name assigned to the VM.
     */
    alias?: string | null;

    /**
     * The parent VM's ID, if present. If None, then this VM is a root VM.
     */
    parent_id?: string | null;
  }

  export namespace Data {
    /**
     * The VM's network configuration
     */
    export interface NetworkInfo {
      guest_ip: string;

      guest_mac: string;

      ssh_port: number;

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface VmDeleteResponse {
  data: VmDeleteResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmDeleteResponse {
  export interface Data {
    /**
     * The ID of the VM.
     */
    id: string;

    /**
     * The IDs of direct children branched from this VM.
     */
    children: Array<string>;

    /**
     * The VM's cluster ID
     */
    cluster_id: string;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * Human-readable name assigned to the VM.
     */
    alias?: string | null;

    /**
     * The parent VM's ID, if present. If None, then this VM is a root VM.
     */
    parent_id?: string | null;
  }

  export namespace Data {
    /**
     * The VM's network configuration
     */
    export interface NetworkInfo {
      guest_ip: string;

      guest_mac: string;

      ssh_port: number;

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface VmBranchResponse {
  data: VmBranchResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmBranchResponse {
  export interface Data {
    /**
     * The ID of the VM.
     */
    id: string;

    /**
     * The IDs of direct children branched from this VM.
     */
    children: Array<string>;

    /**
     * The VM's cluster ID
     */
    cluster_id: string;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * Human-readable name assigned to the VM.
     */
    alias?: string | null;

    /**
     * The parent VM's ID, if present. If None, then this VM is a root VM.
     */
    parent_id?: string | null;
  }

  export namespace Data {
    /**
     * The VM's network configuration
     */
    export interface NetworkInfo {
      guest_ip: string;

      guest_mac: string;

      ssh_port: number;

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface VmCommitResponse {
  data: VmCommitResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmCommitResponse {
  export interface Data {
    id: string;
  }
}

export interface VmGetSSHKeyResponse {
  data: string;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export interface VmUpdateParams {
  alias?: string | null;

  state?: 'Running' | 'Paused' | null;
}

export interface VmDeleteParams {
  /**
   * Delete children recursively
   */
  recursive: boolean;
}

export interface VmBranchParams {
  alias?: string | null;
}

export declare namespace VmResource {
  export {
    type BranchRequest as BranchRequest,
    type UpdateVm as UpdateVm,
    type Vm as Vm,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmUpdateResponse as VmUpdateResponse,
    type VmListResponse as VmListResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
  };
}
