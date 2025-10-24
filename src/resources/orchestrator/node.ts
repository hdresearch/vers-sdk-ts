// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Node extends APIResource {
  listVms(nodeID: string, options?: RequestOptions): APIPromise<VmListAllResponse> {
    return this._client.get(path`/node/${nodeID}/vms`, options);
  }
}

export interface ErrorResponse {
  /**
   * Reason of error
   */
  error?: string;

  /**
   * Is always: false
   */
  success?: boolean;
}

/**
 * Response body for GET /api/vm
 */
export interface VmListAllResponse {
  /**
   * A list of nodes, each of which is a "root VM" with one or more children
   */
  vms: Array<VmListAllResponse.Vm>;
}

export namespace VmListAllResponse {
  /**
   * Represents a tree node for a VM
   */
  export interface Vm {
    /**
     * The VM ID, a (v4) UUID.
     */
    vm_id: string;

    /**
     * The VM's parent ID
     */
    parent_id?: string | null;
  }
}

export declare namespace Node {
  export { type ErrorResponse as ErrorResponse, type VmListAllResponse as VmListAllResponse };
}
