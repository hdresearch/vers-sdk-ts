// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class VmResource extends APIResource {
  /**
   * Retrieve information on a particular VM.
   */
  retrieve(vmID: string, options?: RequestOptions): APIPromise<Vm> {
    return this._client.get(path`/api/vm/${vmID}`, options);
  }

  /**
   * Attempt to update VM state. Will return a 409 if you attempt to resume a VM
   * which has children. Parent VMs must not be mutated, in order to ensure all
   * children are derived from the same snapshot.
   */
  update(vmID: string, params: VmUpdateParams, options?: RequestOptions): APIPromise<Vm> {
    const { body } = params;
    return this._client.patch(path`/api/vm/${vmID}`, { body: body, ...options });
  }

  /**
   * List all VMs.
   */
  list(options?: RequestOptions): APIPromise<VmListResponse> {
    return this._client.get('/api/vm', options);
  }

  /**
   * Delete the specified VM.
   */
  delete(
    vmID: string,
    params: VmDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { recursive } = params ?? {};
    return this._client.delete(path`/api/vm/${vmID}`, {
      query: { recursive },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Creates a branch of the specified VM.
   */
  createBranch(vmID: string, params: VmCreateBranchParams, options?: RequestOptions): APIPromise<Vm> {
    const { body } = params;
    return this._client.post(path`/api/vm/${vmID}/branch`, { body: body, ...options });
  }
}

export interface Vm {
  /**
   * The IDs of direct children branched from this VM.
   */
  children: Array<string>;

  /**
   * The ID of the VM according to Firecracker.
   */
  firecracker_id: string;

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
    eth0_ip: string;

    host_veth_ip: string;

    host_veth_name: string;

    mac_address: string;

    namespace_gateway: string;

    namespace_name: string;

    tap0_ip: string;

    tap0_name: string;

    vm_veth_ip: string;

    vm_veth_name: string;

    vm_veth_namespace: string;
  }
}

export type VmListResponse = Array<Vm>;

export interface VmUpdateParams {
  body: 'pause' | 'resume';
}

export interface VmDeleteParams {
  /**
   * Optionally stop all child VMs recursively
   */
  recursive?: boolean;
}

export interface VmCreateBranchParams {
  body: unknown;
}

export declare namespace VmResource {
  export {
    type Vm as Vm,
    type VmListResponse as VmListResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmCreateBranchParams as VmCreateBranchParams,
  };
}
