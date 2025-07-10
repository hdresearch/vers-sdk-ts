// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VmAPI from './vm';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Cluster extends APIResource {
  /**
   * Create a new cluster.
   */
  create(body: ClusterCreateParams, options?: RequestOptions): APIPromise<ClusterCreateResponse> {
    return this._client.post('/api/cluster', { body, ...options });
  }

  /**
   * Retrieve information on a particular cluster.
   */
  retrieve(clusterIDOrAlias: string, options?: RequestOptions): APIPromise<ClusterRetrieveResponse> {
    return this._client.get(path`/api/cluster/${clusterIDOrAlias}`, options);
  }

  /**
   * Update a cluster's configuration
   */
  update(
    clusterIDOrAlias: string,
    body: ClusterUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ClusterUpdateResponse> {
    return this._client.patch(path`/api/cluster/${clusterIDOrAlias}`, { body, ...options });
  }

  /**
   * List all clusters.
   */
  list(options?: RequestOptions): APIPromise<ClusterListResponse> {
    return this._client.get('/api/cluster', options);
  }

  /**
   * Delete a cluster.
   */
  delete(clusterIDOrAlias: string, options?: RequestOptions): APIPromise<ClusterDeleteResponse> {
    return this._client.delete(path`/api/cluster/${clusterIDOrAlias}`, options);
  }

  /**
   * Get the SSH private key for VM access
   */
  getSSHKey(clusterIDOrAlias: string, options?: RequestOptions): APIPromise<ClusterGetSSHKeyResponse> {
    return this._client.get(path`/api/cluster/${clusterIDOrAlias}/ssh_key`, options);
  }
}

export type ClusterCreateParams =
  | ClusterCreateParams.NewClusterParams
  | ClusterCreateParams.ClusterFromCommitParams;

export namespace ClusterCreateParams {
  export interface NewClusterParams {
    cluster_type: 'new';

    params: NewClusterParams.Params;
  }

  export namespace NewClusterParams {
    export interface Params {
      cluster_alias?: string | null;

      /**
       * The amount of total space to allocate to the cluster
       */
      fs_size_cluster_mib?: number | null;

      /**
       * The size of the VM filesystem (if smaller than the base image + overhead, will
       * cause an error)
       */
      fs_size_vm_mib?: number | null;

      kernel_name?: string | null;

      mem_size_mib?: number | null;

      rootfs_name?: string | null;

      vcpu_count?: number | null;

      vm_alias?: string | null;
    }
  }

  export interface ClusterFromCommitParams {
    cluster_type: 'from_commit';

    params: ClusterFromCommitParams.Params;
  }

  export namespace ClusterFromCommitParams {
    export interface Params {
      commit_key: string;

      cluster_alias?: string | null;

      fs_size_cluster_mib?: number | null;

      vm_alias?: string | null;
    }
  }
}

/**
 * A struct containing information about an attempted cluster deletion request.
 * Reports information in the event of a partial failure so billing can still be
 * udpated appropriately.
 */
export interface ClusterDeleteResponse {
  cluster_id: string;

  /**
   * A struct containing information about an attempted VM deletion request. Reports
   * information in the event of a partial failure so billing can still be udpated
   * appropriately.
   */
  vms: VmAPI.VmDeleteResponse;

  fs_error?: string | null;
}

export interface ClusterDto {
  /**
   * The cluster's ID.
   */
  id: string;

  /**
   * The size of the cluster's backing file
   */
  fs_size_mib: number;

  /**
   * The ID of the cluster's root VM.
   */
  root_vm_id: string;

  /**
   * How many VMs are currently running on this cluster.
   */
  vm_count: number;

  /**
   * The VMs that are children of the cluster, including the root VM.
   */
  vms: Array<VmAPI.VmDto>;

  /**
   * Human-readable name assigned to the cluster.
   */
  alias?: string | null;
}

export interface ClusterPatchParams {
  alias?: string | null;
}

export interface ClusterCreateResponse {
  data: ClusterCreateResponse.Data;

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

export namespace ClusterCreateResponse {
  export interface Data {
    /**
     * The cluster's ID.
     */
    id: string;

    /**
     * The size of the cluster's backing file
     */
    fs_size_mib: number;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id: string;

    /**
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.VmDto>;

    /**
     * Human-readable name assigned to the cluster.
     */
    alias?: string | null;
  }
}

export interface ClusterRetrieveResponse {
  data: ClusterRetrieveResponse.Data;

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

export namespace ClusterRetrieveResponse {
  export interface Data {
    /**
     * The cluster's ID.
     */
    id: string;

    /**
     * The size of the cluster's backing file
     */
    fs_size_mib: number;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id: string;

    /**
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.VmDto>;

    /**
     * Human-readable name assigned to the cluster.
     */
    alias?: string | null;
  }
}

export interface ClusterUpdateResponse {
  data: ClusterUpdateResponse.Data;

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

export namespace ClusterUpdateResponse {
  export interface Data {
    /**
     * The cluster's ID.
     */
    id: string;

    /**
     * The size of the cluster's backing file
     */
    fs_size_mib: number;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id: string;

    /**
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.VmDto>;

    /**
     * Human-readable name assigned to the cluster.
     */
    alias?: string | null;
  }
}

export interface ClusterListResponse {
  data: Array<ClusterListResponse.Data>;

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

export namespace ClusterListResponse {
  export interface Data {
    /**
     * The cluster's ID.
     */
    id: string;

    /**
     * The size of the cluster's backing file
     */
    fs_size_mib: number;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id: string;

    /**
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.VmDto>;

    /**
     * Human-readable name assigned to the cluster.
     */
    alias?: string | null;
  }
}

export interface ClusterDeleteResponse {
  /**
   * A struct containing information about an attempted cluster deletion request.
   * Reports information in the event of a partial failure so billing can still be
   * udpated appropriately.
   */
  data: ClusterDeleteResponse.Data;

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

export namespace ClusterDeleteResponse {
  /**
   * A struct containing information about an attempted cluster deletion request.
   * Reports information in the event of a partial failure so billing can still be
   * udpated appropriately.
   */
  export interface Data {
    cluster_id: string;

    /**
     * A struct containing information about an attempted VM deletion request. Reports
     * information in the event of a partial failure so billing can still be udpated
     * appropriately.
     */
    vms: VmAPI.VmDeleteResponse;

    fs_error?: string | null;
  }
}

export interface ClusterGetSSHKeyResponse {
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

export type ClusterCreateParams =
  | ClusterCreateParams.NewClusterParams
  | ClusterCreateParams.ClusterFromCommitParams;

export declare namespace ClusterCreateParams {
  export interface NewClusterParams {
    cluster_type: 'new';

    params: NewClusterParams.Params;
  }

  export namespace NewClusterParams {
    export interface Params {
      cluster_alias?: string | null;

      /**
       * The amount of total space to allocate to the cluster
       */
      fs_size_cluster_mib?: number | null;

      /**
       * The size of the VM filesystem (if smaller than the base image + overhead, will
       * cause an error)
       */
      fs_size_vm_mib?: number | null;

      kernel_name?: string | null;

      mem_size_mib?: number | null;

      rootfs_name?: string | null;

      vcpu_count?: number | null;

      vm_alias?: string | null;
    }
  }

  export interface ClusterFromCommitParams {
    cluster_type: 'from_commit';

    params: ClusterFromCommitParams.Params;
  }

  export namespace ClusterFromCommitParams {
    export interface Params {
      commit_key: string;

      cluster_alias?: string | null;

      fs_size_cluster_mib?: number | null;

      vm_alias?: string | null;
    }
  }
}

export interface ClusterUpdateParams {
  alias?: string | null;
}

export declare namespace Cluster {
  export {
    type ClusterCreateParams as ClusterCreateParams,
    type ClusterDeleteResponse as ClusterDeleteResponse,
    type ClusterDto as ClusterDto,
    type ClusterPatchParams as ClusterPatchParams,
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterUpdateResponse as ClusterUpdateResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterUpdateParams as ClusterUpdateParams,
  };
}
