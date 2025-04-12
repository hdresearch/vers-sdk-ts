// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
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
   * Update VM state (pause/resume)
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

  commit(vmID: string, params: VmCommitParams, options?: RequestOptions): APIPromise<VmCommitResponse> {
    const { body } = params;
    return this._client.post(path`/api/vm/${vmID}/commit`, { body: body, ...options });
  }

  /**
   * Creates a branch of the specified VM.
   */
  createBranch(vmID: string, params: VmCreateBranchParams, options?: RequestOptions): APIPromise<Vm> {
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

export interface VmCommitResponse {
  id: string;

  command_result: VmCommitResponse.CommandResult;
}

export namespace VmCommitResponse {
  export interface CommandResult {
    exit_code: number;

    stderr: string;

    stdout: string;
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

export interface VmUpdateParams {
  body: 'pause' | 'resume';
}

export interface VmDeleteParams {
  /**
   * Optionally delete all child VMs recursively
   */
  recursive?: boolean;
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
    type VmCommitResponse as VmCommitResponse,
    type VmExecuteResponse as VmExecuteResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmCommitParams as VmCommitParams,
    type VmCreateBranchParams as VmCreateBranchParams,
    type VmExecuteParams as VmExecuteParams,
  };
}
