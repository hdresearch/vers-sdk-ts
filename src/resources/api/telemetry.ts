// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Telemetry extends APIResource {
  /**
   * Get telemetry information
   */
  getInfo(options?: RequestOptions): APIPromise<TelemetryDto> {
    return this._client.get('/api/telemetry', options);
  }
}

export interface TelemetryDto {
  fs_mib_current: number;

  fs_mib_max: number;

  mem_mib_current: number;

  mem_mib_max: number;

  vcpu_current: number;

  vcpu_max: number;

  vm_network_count_in_use: number;

  vm_network_count_total: number;
}

export declare namespace Telemetry {
  export { type TelemetryDto as TelemetryDto };
}
