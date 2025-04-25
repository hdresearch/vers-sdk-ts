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
   * Branch a VM.
   */
  branch(vmID: string, params: VmBranchParams, options?: RequestOptions): APIPromise<Vm> {
    const { branch } = params;
    return this._client.post(path`/api/vm/${vmID}/branch`, { body: branch, ...options });
  }

  /**
   * Commit a VM.
   */
  commit(vmID: string, params: VmCommitParams, options?: RequestOptions): APIPromise<Vm> {
    const { commit } = params;
    return this._client.post(path`/api/vm/${vmID}/commit`, { body: commit, ...options });
  }

  /**
   * Execute a command in a VM.
   */
  execute(vmID: string, body: VmExecuteParams, options?: RequestOptions): APIPromise<ExecuteResponse> {
    return this._client.post(path`/api/vm/${vmID}/execute`, { body, ...options });
  }

  /**
   * Get the SSH private key for VM access
   */
  getSSHKey(vmID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.get(path`/api/vm/${vmID}/ssh-key`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/plain' }, options?.headers]),
    });
  }
}

export type Branch = unknown;

export type Commit = unknown;

export interface ExecuteCommand {
  command: string;
}

export interface ExecuteResponse {
  id: string;

  command_result: ExecuteResponse.CommandResult;
}

export namespace ExecuteResponse {
  export interface CommandResult {
    exit_code: number;

    stderr: string;

    stdout: string;
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

export type VmListResponse = Array<Vm>;

export type VmGetSSHKeyResponse = string;

export interface VmDeleteParams {
  /**
   * Delete children recursively
   */
  recursive: boolean;
}

export interface VmBranchParams {
  branch: Branch;
}

export interface VmCommitParams {
  commit: Commit;
}

export interface VmExecuteParams {
  command: string;
}

export declare namespace VmResource {
  export {
    type Branch as Branch,
    type Commit as Commit,
    type ExecuteCommand as ExecuteCommand,
    type ExecuteResponse as ExecuteResponse,
    type PatchRequest as PatchRequest,
    type Vm as Vm,
    type VmListResponse as VmListResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
    type VmCommitParams as VmCommitParams,
    type VmExecuteParams as VmExecuteParams,
  };
}
