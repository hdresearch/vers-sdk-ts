// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Vm extends APIResource {
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

export interface VmBranchParams {
  alias?: string | null;
}

/**
 * A struct containing information about an attempted VM deletion request. Reports
 * information in the event of a partial failure so billing can still be udpated
 * appropriately.
 */
export interface VmDeleteResponse {
  deleted_ids: Array<string>;

  errors: Array<VmDeleteResponse.Error>;
}

export namespace VmDeleteResponse {
  /**
   * Contains a VM ID and the reason that it could not be deleted.
   */
  export interface Error {
    id: string;

    error: string;
  }
}

export interface VmDto {
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
   * What is the size of the "disk" allocated to this VM
   */
  fs_size_mib: number;

  /**
   * The VM's local IP address on the VM subnet
   */
  ip_address: string;

  /**
   * How much RAM is allocated to this VM
   */
  mem_size_mib: number;

  /**
   * The VM's network configuration
   */
  network_info: VmDto.NetworkInfo;

  /**
   * Whether the VM is running, paused, or not started.
   */
  state: 'Not started' | 'Running' | 'Paused';

  /**
   * How many vCPUs were allocated to this VM
   */
  vcpu_count: number;

  /**
   * Human-readable name assigned to the VM.
   */
  alias?: string | null;

  /**
   * The parent VM's ID, if present. If None, then this VM is a root VM.
   */
  parent_id?: string | null;
}

export namespace VmDto {
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

export interface VmPatchParams {
  alias?: string | null;

  state?: 'Running' | 'Paused' | null;
}

export interface VmRetrieveResponse {
  data: VmRetrieveResponse.Data;

  duration_ns: number;

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

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
     * What is the size of the "disk" allocated to this VM
     */
    fs_size_mib: number;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * How much RAM is allocated to this VM
     */
    mem_size_mib: number;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * How many vCPUs were allocated to this VM
     */
    vcpu_count: number;

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

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

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
     * What is the size of the "disk" allocated to this VM
     */
    fs_size_mib: number;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * How much RAM is allocated to this VM
     */
    mem_size_mib: number;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * How many vCPUs were allocated to this VM
     */
    vcpu_count: number;

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

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

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
     * What is the size of the "disk" allocated to this VM
     */
    fs_size_mib: number;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * How much RAM is allocated to this VM
     */
    mem_size_mib: number;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * How many vCPUs were allocated to this VM
     */
    vcpu_count: number;

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
  /**
   * A struct containing information about an attempted VM deletion request. Reports
   * information in the event of a partial failure so billing can still be udpated
   * appropriately.
   */
  data: VmDeleteResponse.Data;

  duration_ns: number;

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace VmDeleteResponse {
  /**
   * A struct containing information about an attempted VM deletion request. Reports
   * information in the event of a partial failure so billing can still be udpated
   * appropriately.
   */
  export interface Data {
    deleted_ids: Array<string>;

    errors: Array<Data.Error>;
  }

  export namespace Data {
    /**
     * Contains a VM ID and the reason that it could not be deleted.
     */
    export interface Error {
      id: string;

      error: string;
    }
  }
}

export interface VmBranchResponse {
  data: VmBranchResponse.Data;

  duration_ns: number;

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

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
     * What is the size of the "disk" allocated to this VM
     */
    fs_size_mib: number;

    /**
     * The VM's local IP address on the VM subnet
     */
    ip_address: string;

    /**
     * How much RAM is allocated to this VM
     */
    mem_size_mib: number;

    /**
     * The VM's network configuration
     */
    network_info: Data.NetworkInfo;

    /**
     * Whether the VM is running, paused, or not started.
     */
    state: 'Not started' | 'Running' | 'Paused';

    /**
     * How many vCPUs were allocated to this VM
     */
    vcpu_count: number;

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

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

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

  operation_code:
    | 'list_clusters'
    | 'get_cluster'
    | 'create_cluster'
    | 'delete_cluster'
    | 'update_cluster'
    | 'get_cluster_ssh_key'
    | 'list_vms'
    | 'get_vm'
    | 'update_vm'
    | 'branch_vm'
    | 'commit_vm'
    | 'delete_vm'
    | 'get_vm_ssh_key'
    | 'upload_rootfs'
    | 'delete_rootfs'
    | 'list_rootfs';

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

export declare namespace Vm {
  export {
    type VmBranchParams as VmBranchParams,
    type VmDeleteResponse as VmDeleteResponse,
    type VmDto as VmDto,
    type VmPatchParams as VmPatchParams,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmUpdateResponse as VmUpdateResponse,
    type VmListResponse as VmListResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
  };
}
