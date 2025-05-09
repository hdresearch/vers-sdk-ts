// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VmAPI from './vm';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ClusterResource extends APIResource {
  /**
   * Create a new cluster.
   */
  create(body: ClusterCreateParams, options?: RequestOptions): APIPromise<Cluster> {
    return this._client.post('/api/cluster', { body, ...options });
  }

  /**
   * Retrieve information on a particular cluster.
   */
  retrieve(clusterID: string, options?: RequestOptions): APIPromise<Cluster> {
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
  delete(clusterID: string, options?: RequestOptions): APIPromise<Cluster> {
    return this._client.delete(path`/api/cluster/${clusterID}`, options);
  }

  /**
   * Get the SSH private key for VM access
   */
  getSSHKey(clusterID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.get(path`/api/cluster/${clusterID}/ssh_key`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/plain' }, options?.headers]),
    });
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

export interface Create {
  kernel_name?: string | null;

  mem_size_mib?: number | null;

  rootfs_name?: string | null;

  vcpu_count?: number | null;
}

export type ClusterListResponse = Array<Cluster>;

export type ClusterGetSSHKeyResponse = string;

export interface ClusterCreateParams {
  kernel_name?: string | null;

  mem_size_mib?: number | null;

  rootfs_name?: string | null;

  vcpu_count?: number | null;
}

export declare namespace ClusterResource {
  export {
    type Cluster as Cluster,
    type Create as Create,
    type ClusterListResponse as ClusterListResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };
}
