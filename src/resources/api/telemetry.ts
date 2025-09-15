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
  id: string;

  cpu_cores_available: number;

  cpu_cores_margin: number;

  cpu_cores_total: number;

  cpu_cores_used: number;

  disk_data_mib_available: number;

  disk_data_mib_total: number;

  disk_vm_mib_available: number;

  disk_vm_mib_total: number;

  memory_mib_available: number;

  memory_mib_margin: number;

  memory_mib_total: number;

  memory_mib_used: number;

  vm_network_count_in_use: number;

  vm_network_count_total: number;
}

export declare namespace Telemetry {
  export { type TelemetryDto as TelemetryDto };
}
