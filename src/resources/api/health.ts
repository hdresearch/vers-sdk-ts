// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Health extends APIResource {
  /**
   * Get health of the API.
   */
  check(options?: RequestOptions): APIPromise<string> {
    return this._client.get('/api/health', {
      ...options,
      headers: buildHeaders([{ Accept: 'text/plain' }, options?.headers]),
    });
  }
}

export type HealthCheckResponse = string;

export declare namespace Health {
  export { type HealthCheckResponse as HealthCheckResponse };
}
