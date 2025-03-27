// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VmAPI from './vm';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ClusterResource extends APIResource {
  /**
   * Start a new cluster.
   */
  create(params: ClusterCreateParams, options?: RequestOptions): APIPromise<Cluster> {
    const { body } = params;
    return this._client.post('/api/cluster', { body: body, ...options });
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
  delete(
    clusterID: string,
    params: ClusterDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { force } = params ?? {};
    return this._client.delete(path`/api/cluster/${clusterID}`, {
      query: { force },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Cluster {
  /**
   * The cluster's ID.
   */
  id: string;

  /**
   * The VMs that are children of the cluster, including the root VM.
   */
  children: Array<VmAPI.Vm>;

  /**
   * The ID of the cluster's root VM.
   */
  root_vm_id: string;

  /**
   * How many VMs are currently running on this cluster.
   */
  vm_count: number;
}

export type ClusterListResponse = Array<Cluster>;

export interface ClusterCreateParams {
  body: unknown;
}

export interface ClusterDeleteParams {
  /**
   * If true, will delete the cluster and all its children. Otherwise, will only
   * delete the cluster if it has no children (besides the root VM)
   */
  force?: boolean;
}

export declare namespace ClusterResource {
  export {
    type Cluster as Cluster,
    type ClusterListResponse as ClusterListResponse,
    type ClusterCreateParams as ClusterCreateParams,
    type ClusterDeleteParams as ClusterDeleteParams,
  };
}
