// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Vm extends APIResource {
  /**
   * Retrieve information on a particular VM.
   */
  retrieve(vmID: string, options?: RequestOptions): APIPromise<VmRetrieveResponse> {
    return this._client.get(path`/api/vm/${vmID}`, options);
  }

  /**
   * Update VM state (pause/resume)
   */
  update(vmID: string, body: VmUpdateParams, options?: RequestOptions): APIPromise<VmUpdateResponse> {
    return this._client.patch(path`/api/vm/${vmID}`, { body, ...options });
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
  createBranch(
    vmID: string,
    params: VmCreateBranchParams,
    options?: RequestOptions,
  ): APIPromise<VmCreateBranchResponse> {
    const { body } = params;
    return this._client.post(path`/api/vm/${vmID}/branch`, { body: body, ...options });
  }

  /**
   * Execute a command on the specified VM.
   */
  execute(vmID: string, body: VmExecuteParams, options?: RequestOptions): APIPromise<VmExecuteResponse> {
    return this._client.post(path`/api/vm/${vmID}/execute`, { body, ...options });
  }
}

export interface VmRetrieveResponse {
  /**
   * The ID of the VM.
   */
  id: string;

  /**
   * The IDs of direct children branched from this VM.
   */
  children: Array<string>;

  /**
   * The VM's local IP address on the VM subnet
   */
  ip_address: string;

  /**
   * The VM's network configuration
   */
  network_info: VmRetrieveResponse.NetworkInfo;

  /**
   * Whether the VM is running, paused, or not started.
   */
  state: 'Not started' | 'Running' | 'Paused';

  /**
   * The parent VM's ID, if present. If None, then this VM is a root VM.
   */
  parent_id?: string | null;
}

export namespace VmRetrieveResponse {
  /**
   * The VM's network configuration
   */
  export interface NetworkInfo {
    guest_ip: string;

    guest_mac: string;

    tap0_ip: string;

    tap0_name: string;

    vm_namespace: string;
  }
}

export interface VmUpdateResponse {
  /**
   * The ID of the VM.
   */
  id: string;

  /**
   * The IDs of direct children branched from this VM.
   */
  children: Array<string>;

  /**
   * The VM's local IP address on the VM subnet
   */
  ip_address: string;

  /**
   * The VM's network configuration
   */
  network_info: VmUpdateResponse.NetworkInfo;

  /**
   * Whether the VM is running, paused, or not started.
   */
  state: 'Not started' | 'Running' | 'Paused';

  /**
   * The parent VM's ID, if present. If None, then this VM is a root VM.
   */
  parent_id?: string | null;
}

export namespace VmUpdateResponse {
  /**
   * The VM's network configuration
   */
  export interface NetworkInfo {
    guest_ip: string;

    guest_mac: string;

    tap0_ip: string;

    tap0_name: string;

    vm_namespace: string;
  }
}

export type VmListResponse = Array<VmListResponse.VmListResponseItem>;

export namespace VmListResponse {
  export interface VmListResponseItem {
    /**
     * The ID of the VM.
     */
    id: string;

    /**
     * The IDs of direct children branched from this VM.
     */
    children: Array<string>;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * The VM's network configuration
     */
    network_info: VmListResponseItem.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * The parent VM's ID, if present. If None, then this VM is a root VM.
     */
    parent_id?: string | null;
  }

  export namespace VmListResponseItem {
    /**
     * The VM's network configuration
     */
    export interface NetworkInfo {
      guest_ip: string;

      guest_mac: string;

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface VmCreateBranchResponse {
  /**
   * The ID of the VM.
   */
  id: string;

  /**
   * The IDs of direct children branched from this VM.
   */
  children: Array<string>;

  /**
   * The VM's local IP address on the VM subnet
   */
  ip_address: string;

  /**
   * The VM's network configuration
   */
  network_info: VmCreateBranchResponse.NetworkInfo;

  /**
   * Whether the VM is running, paused, or not started.
   */
  state: 'Not started' | 'Running' | 'Paused';

  /**
   * The parent VM's ID, if present. If None, then this VM is a root VM.
   */
  parent_id?: string | null;
}

export namespace VmCreateBranchResponse {
  /**
   * The VM's network configuration
   */
  export interface NetworkInfo {
    guest_ip: string;

    guest_mac: string;

    tap0_ip: string;

    tap0_name: string;

    vm_namespace: string;
  }
}

export interface VmExecuteResponse {
  id: string;

  command_result: VmExecuteResponse.CommandResult;
}

export namespace VmExecuteResponse {
  export interface CommandResult {
    exit_code: number;

    stderr: string;

    stdout: string;
  }
}

export type VmUpdateParams = VmUpdateParams.Variant0 | VmUpdateParams.Variant1;

export declare namespace VmUpdateParams {
  export interface Variant0 {
    action: 'pause';
  }

  export interface Variant1 {
    action: 'resume';
  }
}

export interface VmDeleteParams {
  /**
   * Optionally delete all child VMs recursively
   */
  recursive?: boolean;
}

export interface VmCreateBranchParams {
  body: unknown;
}

export interface VmExecuteParams {
  command: string;
}

export declare namespace Vm {
  export {
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmUpdateResponse as VmUpdateResponse,
    type VmListResponse as VmListResponse,
    type VmCreateBranchResponse as VmCreateBranchResponse,
    type VmExecuteResponse as VmExecuteResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmCreateBranchParams as VmCreateBranchParams,
    type VmExecuteParams as VmExecuteParams,
  };
}
