// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Network extends APIResource {
  /**
   * Get network information
   */
  getInfo(options?: RequestOptions): APIPromise<Info> {
    return this._client.get('/api/network', options);
  }
}

export interface Info {
  num_networks: number;

  num_networks_available: number;

  num_networks_in_use: number;
}

export declare namespace Network {
  export { type Info as Info };
}
