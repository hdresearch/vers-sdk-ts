// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class VmResource extends APIResource {
  /**
   * Retrieve information on a particular VM.
   */
  retrieve(vmID: string, options?: RequestOptions): APIPromise<VmRetrieveResponse> {
    return this._client.get(path`/api/vm/${vmID}`, options);
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
  delete(vmID: string, params: VmDeleteParams, options?: RequestOptions): APIPromise<VmDeleteResponse> {
    const { recursive } = params;
    return this._client.delete(path`/api/vm/${vmID}`, { query: { recursive }, ...options });
  }

  /**
   * Branch a VM.
   */
  branch(vmID: string, options?: RequestOptions): APIPromise<VmBranchResponse> {
    return this._client.post(path`/api/vm/${vmID}/branch`, options);
  }

  /**
   * Commit a VM.
   */
  commit(vmID: string, options?: RequestOptions): APIPromise<VmCommitResponse> {
    return this._client.post(path`/api/vm/${vmID}/commit`, options);
  }

  /**
   * Get the SSH private key for VM access
   */
  getSSHKey(vmID: string, options?: RequestOptions): APIPromise<VmGetSSHKeyResponse> {
    return this._client.get(path`/api/vm/${vmID}/ssh_key`, options);
  }

  /**
   * Update VM state.
   */
  updateState(
    vmID: string,
    body: VmUpdateStateParams,
    options?: RequestOptions,
  ): APIPromise<VmUpdateStateResponse> {
    return this._client.patch(path`/api/vm/${vmID}`, { body, ...options });
  }
}

export interface PatchRequest {
  action: 'pause' | 'resume';
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

export interface VmGetSSHKeyResponse {
  data: string;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export interface VmUpdateStateResponse {
  data: VmUpdateStateResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmUpdateStateResponse {
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

export interface VmDeleteParams {
  /**
   * Delete children recursively
   */
  recursive: boolean;
}

export interface VmUpdateStateParams {
  action: 'pause' | 'resume';
}

export declare namespace VmResource {
  export {
    type PatchRequest as PatchRequest,
    type Vm as Vm,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmListResponse as VmListResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmUpdateStateResponse as VmUpdateStateResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmUpdateStateParams as VmUpdateStateParams,
  };
}
