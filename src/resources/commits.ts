// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Commits extends APIResource {
  update(commitID: string, body: CommitUpdateParams, options?: RequestOptions): APIPromise<CommitInfo> {
    return this._client.patch(path`/api/v1/commits/${commitID}`, { body, ...options });
  }

  list(options?: RequestOptions): APIPromise<ListCommitsResponse> {
    return this._client.get('/api/v1/commits', options);
  }

  delete(commitID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v1/commits/${commitID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  listParents(commitID: string, options?: RequestOptions): APIPromise<CommitListParentsResponse> {
    return this._client.get(path`/api/v1/vm/commits/${commitID}/parents`, options);
  }

  listPublic(options?: RequestOptions): APIPromise<ListCommitsResponse> {
    return this._client.get('/api/v1/commits/public', options);
  }
}

export interface CommitInfo {
  commit_id: string;

  created_at: string;

  is_public: boolean;

  name: string;

  owner_id: string;

  description?: string | null;

  grandparent_commit_id?: string | null;

  parent_vm_id?: string | null;
}

export interface ListCommitsResponse {
  commits: Array<CommitInfo>;

  limit: number;

  offset: number;

  total: number;
}

/**
 * Request body for PATCH /commits/{commit_id}
 */
export interface UpdateCommitRequest {
  is_public: boolean;

  /**
   * Optional description for the commit.
   */
  description?: string | null;

  /**
   * Optional human-readable name for the commit.
   */
  name?: string | null;
}

export type CommitListParentsResponse = Array<CommitListParentsResponse.CommitListParentsResponseItem>;

export namespace CommitListParentsResponse {
  export interface CommitListParentsResponseItem {
    id: string;

    created_at: string;

    /**
     * Whether this commit is publicly accessible (readable/restorable by anyone).
     */
    is_public: boolean;

    name: string;

    /**
     * api key id.
     */
    owner_id: string;

    description?: string | null;

    /**
     * The commit that this commit's parent VM was started from, if any. Intended to
     * optimize traversing the commit tree.
     */
    grandparent_commit_id?: string | null;

    /**
     * The VM that this commit was created from, if any.
     */
    parent_vm_id?: string | null;
  }
}

export interface CommitUpdateParams {
  is_public: boolean;

  /**
   * Optional description for the commit.
   */
  description?: string | null;

  /**
   * Optional human-readable name for the commit.
   */
  name?: string | null;
}

export declare namespace Commits {
  export {
    type CommitInfo as CommitInfo,
    type ListCommitsResponse as ListCommitsResponse,
    type UpdateCommitRequest as UpdateCommitRequest,
    type CommitListParentsResponse as CommitListParentsResponse,
    type CommitUpdateParams as CommitUpdateParams,
  };
}
