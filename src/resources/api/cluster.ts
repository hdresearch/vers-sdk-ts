// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Cluster extends APIResource {
  /**
   * Create a new cluster.
   */
  create(params: ClusterCreateParams, options?: RequestOptions): APIPromise<ClusterCreateResponse> {
    const { body } = params;
    return this._client.post('/api/cluster', { body: body, ...options });
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
}

export interface ClusterCreateResponse {
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
  vms: Array<ClusterCreateResponse.Vm>;

  /**
   * The ID of the cluster's root VM.
   */
  root_vm_id?: string | null;
}

export namespace ClusterCreateResponse {
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

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface ClusterRetrieveResponse {
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
  vms: Array<ClusterRetrieveResponse.Vm>;

  /**
   * The ID of the cluster's root VM.
   */
  root_vm_id?: string | null;
}

export namespace ClusterRetrieveResponse {
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

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export type ClusterListResponse = Array<ClusterListResponse.ClusterListResponseItem>;

export namespace ClusterListResponse {
  export interface ClusterListResponseItem {
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
    vms: Array<ClusterListResponseItem.Vm>;

    /**
     * The ID of the cluster's root VM.
     */
    root_vm_id?: string | null;
  }

  export namespace ClusterListResponseItem {
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

        tap0_ip: string;

        tap0_name: string;

        vm_namespace: string;
      }
    }
  }
}

export interface ClusterDeleteResponse {
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
  vms: Array<ClusterDeleteResponse.Vm>;

  /**
   * The ID of the cluster's root VM.
   */
  root_vm_id?: string | null;
}

export namespace ClusterDeleteResponse {
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

      tap0_ip: string;

      tap0_name: string;

      vm_namespace: string;
    }
  }
}

export interface ClusterCreateParams {
  body: unknown;
}

export declare namespace Cluster {
  export {
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterDeleteResponse as ClusterDeleteResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };
}
