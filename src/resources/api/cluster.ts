// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VmAPI from './vm';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ClusterResource extends APIResource {
  /**
   * Create a new cluster.
   */
  create(body: ClusterCreateParams, options?: RequestOptions): APIPromise<ClusterCreateResponse> {
    return this._client.post('/api/cluster', { body, ...options });
  }

  /**
   * Retrieve information on a particular cluster.
   */
  retrieve(clusterID: string, options?: RequestOptions): APIPromise<ClusterRetrieveResponse> {
    return this._client.get(path`/api/cluster/${clusterID}`, options);
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
  delete(clusterID: string, options?: RequestOptions): APIPromise<ClusterDeleteResponse> {
    return this._client.delete(path`/api/cluster/${clusterID}`, options);
  }

  /**
   * Get the SSH private key for VM access
   */
  getSSHKey(clusterID: string, options?: RequestOptions): APIPromise<ClusterGetSSHKeyResponse> {
    return this._client.get(path`/api/cluster/${clusterID}/ssh_key`, options);
  }
}

export interface Cluster {
  /**
   * The cluster's ID.
   */
  id: string;

  /**
   * How many VMs are currently running on this cluster.
   */
  vm_count: number;

  /**
   * The VMs that are children of the cluster, including the root VM.
   */
  vms: Array<VmAPI.Vm>;

  /**
   * The ID of the cluster's root VM.
   */
  root_vm_id?: string | null;
}

export interface ClusterCreateResponse {
  data: ClusterCreateResponse.Data;

  duration_ns: number;

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
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.Vm>;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id?: string | null;
  }
}

export interface ClusterRetrieveResponse {
  data: ClusterRetrieveResponse.Data;

  duration_ns: number;

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
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.Vm>;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id?: string | null;
  }
}

export interface ClusterListResponse {
  data: Array<ClusterListResponse.Data>;

  duration_ns: number;

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
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.Vm>;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id?: string | null;
  }
}

export interface ClusterDeleteResponse {
  data: ClusterDeleteResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace ClusterDeleteResponse {
  export interface Data {
    /**
     * The cluster's ID.
     */
    id: string;

    /**
     * How many VMs are currently running on this cluster.
     */
    vm_count: number;

    /**
     * The VMs that are children of the cluster, including the root VM.
     */
    vms: Array<VmAPI.Vm>;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id?: string | null;
  }
}

export interface ClusterGetSSHKeyResponse {
  data: string;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export type ClusterCreateParams = ClusterCreateParams.Variant0 | ClusterCreateParams.Variant1;

export declare namespace ClusterCreateParams {
  export interface Variant0 {
    cluster_type: 'new';

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
  }

  export interface Variant1 {
    cluster_type: 'from_commit';

    commit_key: string;

    size_cluster_mib?: number | null;
  }
}

export declare namespace ClusterResource {
  export {
    type Cluster as Cluster,
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterDeleteResponse as ClusterDeleteResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };
}
