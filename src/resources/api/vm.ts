// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class VmResource extends APIResource {
  /**
   * List all VMs.
   */
  list(options?: RequestOptions): APIPromise<VmListResponse> {
    return this._client.get('/api/vm', options);
  }
}

export interface BranchRequest {
  alias?: string | null;
}

export interface PatchRequest {
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

export declare namespace VmResource {
  export {
    type BranchRequest as BranchRequest,
    type PatchRequest as PatchRequest,
    type Vm as Vm,
    type VmListResponse as VmListResponse,
  };
}
