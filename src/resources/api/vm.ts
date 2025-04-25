// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
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
   * List all VMs.
   */
  list(options?: RequestOptions): APIPromise<VmListResponse> {
    return this._client.get('/api/vm', options);
  }

  /**
   * Delete a VM.
   */
  delete(vmID: string, params: VmDeleteParams, options?: RequestOptions): APIPromise<Vm> {
    const { recursive } = params;
    return this._client.delete(path`/api/vm/${vmID}`, { query: { recursive }, ...options });
  }

  /**
   * Commit a VM.
   */
  commit(vmID: string, params: VmCommitParams, options?: RequestOptions): APIPromise<Vm> {
    const { body } = params;
    return this._client.post(path`/api/vm/${vmID}/commit`, { body: body, ...options });
  }

  /**
   * Branch a VM.
   */
  createBranch(vmID: string, params: VmCreateBranchParams, options?: RequestOptions): APIPromise<Vm> {
    const { body } = params;
    return this._client.post(path`/api/vm/${vmID}/branch`, { body: body, ...options });
  }

  /**
   * Execute a command in a VM.
   */
  execute(vmID: string, body: VmExecuteParams, options?: RequestOptions): APIPromise<VmExecuteResponse> {
    return this._client.post(path`/api/vm/${vmID}/execute`, { body, ...options });
  }
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

export type VmListResponse = Array<Vm>;

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

export interface VmDeleteParams {
  /**
   * Delete children recursively
   */
  recursive: boolean;
}

export interface VmCommitParams {
  body: unknown;
}

export interface VmCreateBranchParams {
  body: unknown;
}

export interface VmExecuteParams {
  command: string;
}

export declare namespace VmResource {
  export {
    type Vm as Vm,
    type VmListResponse as VmListResponse,
    type VmExecuteResponse as VmExecuteResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmCommitParams as VmCommitParams,
    type VmCreateBranchParams as VmCreateBranchParams,
    type VmExecuteParams as VmExecuteParams,
  };
}
