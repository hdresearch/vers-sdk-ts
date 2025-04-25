// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Rootfs extends APIResource {
  /**
   * List all available rootfs names on the server.
   */
  list(options?: RequestOptions): APIPromise<ListResponse> {
    return this._client.get('/api/rootfs', options);
  }

  /**
   * Delete an existing rootfs from the server.
   */
  delete(rootfsID: string, options?: RequestOptions): APIPromise<DeleteResponse> {
    return this._client.delete(path`/api/rootfs/${rootfsID}`, options);
  }

  /**
   * Upload a rootfs tar archive to the server. The archive should contain the
   * Dockerfile and any relevant dependencies.
   */
  upload(rootfsID: string, options?: RequestOptions): APIPromise<UploadResponse> {
    return this._client.post(path`/api/rootfs/${rootfsID}`, options);
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

export declare namespace Rootfs {
  export {
    type DeleteResponse as DeleteResponse,
    type ListResponse as ListResponse,
    type UploadResponse as UploadResponse,
  };
}
