// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Rootfs extends APIResource {
  /**
   * List all available rootfs names on the server.
   */
  list(options?: RequestOptions): APIPromise<RootfListResponse> {
    return this._client.get('/api/rootfs', options);
  }

  /**
   * Delete an existing rootfs from the server.
   */
  delete(rootfsID: string, options?: RequestOptions): APIPromise<RootfDeleteResponse> {
    return this._client.delete(path`/api/rootfs/${rootfsID}`, options);
  }

  /**
   * Upload a rootfs tar archive to the server. The archive should contain the
   * Dockerfile and all necessary dependencies.
   */
  upload(
    rootfsID: string,
    params: RootfUploadParams,
    options?: RequestOptions,
  ): APIPromise<RootfUploadResponse> {
    const { dockerfile } = params;
    return this._client.put(path`/api/rootfs/${rootfsID}`, { query: { dockerfile }, ...options });
  }
}

export interface DeleteResponse {
  rootfs_name: string;
}

export interface ListResponse {
  rootfs_names: Array<string>;
}

export interface UploadResponse {
  rootfs_name: string;
}

export interface RootfListResponse {
  data: RootfListResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace RootfListResponse {
  export interface Data {
    rootfs_names: Array<string>;
  }
}

export interface RootfDeleteResponse {
  data: RootfDeleteResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace RootfDeleteResponse {
  export interface Data {
    rootfs_name: string;
  }
}

export interface RootfUploadResponse {
  data: RootfUploadResponse.Data;

  duration_ns: number;

  operation_id: string;

  /**
   * Unix epoch time (secs)
   */
  time_start: number;
}

export namespace RootfUploadResponse {
  export interface Data {
    rootfs_name: string;
  }
}

export interface RootfUploadParams {
  /**
   * The path of the Dockerfile contained within the tar archive
   */
  dockerfile: RootfUploadParams.Dockerfile;
}

export namespace RootfUploadParams {
  /**
   * The path of the Dockerfile contained within the tar archive
   */
  export interface Dockerfile {
    dockerfile?: string | null;
  }
}

export declare namespace Rootfs {
  export {
    type DeleteResponse as DeleteResponse,
    type ListResponse as ListResponse,
    type UploadResponse as UploadResponse,
    type RootfListResponse as RootfListResponse,
    type RootfDeleteResponse as RootfDeleteResponse,
    type RootfUploadResponse as RootfUploadResponse,
    type RootfUploadParams as RootfUploadParams,
  };
}
