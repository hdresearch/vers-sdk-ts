// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CommitTags extends APIResource {
  create(body: CommitTagCreateParams, options?: RequestOptions): APIPromise<CreateTagResponse> {
    return this._client.post('/api/v1/commit_tags', { body, ...options });
  }

  update(tagName: string, body: CommitTagUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/api/v1/commit_tags/${tagName}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  list(options?: RequestOptions): APIPromise<ListTagsResponse> {
    return this._client.get('/api/v1/commit_tags', options);
  }

  delete(tagName: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v1/commit_tags/${tagName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  get(tagName: string, options?: RequestOptions): APIPromise<TagInfo> {
    return this._client.get(path`/api/v1/commit_tags/${tagName}`, options);
  }
}

/**
 * Request body for POST /api/v1/commit_tags
 */
export interface CreateTagRequest {
  /**
   * The commit ID this tag should point to
   */
  commit_id: string;

  /**
   * The name of the tag (alphanumeric, hyphens, underscores, dots, 1-64 chars)
   */
  tag_name: string;

  /**
   * Optional description of what this tag represents
   */
  description?: string | null;
}

/**
 * Response body for POST /api/v1/commit_tags
 */
export interface CreateTagResponse {
  /**
   * The commit ID this tag points to
   */
  commit_id: string;

  /**
   * The ID of the newly created tag
   */
  tag_id: string;

  /**
   * The name of the tag
   */
  tag_name: string;
}

/**
 * Response body for GET /api/v1/commit_tags
 */
export interface ListTagsResponse {
  /**
   * List of all tags in the user's organization
   */
  tags: Array<TagInfo>;
}

/**
 * Tag information returned in list and get operations
 */
export interface TagInfo {
  /**
   * The commit ID this tag currently points to
   */
  commit_id: string;

  /**
   * When the tag was created
   */
  created_at: string;

  /**
   * The tag's unique identifier
   */
  tag_id: string;

  /**
   * The name of the tag
   */
  tag_name: string;

  /**
   * When the tag was last updated (moved to different commit or description changed)
   */
  updated_at: string;

  /**
   * Optional description of what this tag represents
   */
  description?: string | null;
}

/**
 * Request body for PATCH /api/v1/commit_tags/{tag_name}
 *
 * For `description`:
 *
 * - Field absent from JSON → don't change the description
 * - Field present as `null` → clear the description
 * - Field present as `"text"` → set the description to "text"
 */
export interface UpdateTagRequest {
  /**
   * Optional new commit ID to move the tag to
   */
  commit_id?: string | null;

  /**
   * Optional new description for the tag. Send `null` to clear an existing
   * description.
   */
  description?: string | null;
}

export interface CommitTagCreateParams {
  /**
   * The commit ID this tag should point to
   */
  commit_id: string;

  /**
   * The name of the tag (alphanumeric, hyphens, underscores, dots, 1-64 chars)
   */
  tag_name: string;

  /**
   * Optional description of what this tag represents
   */
  description?: string | null;
}

export interface CommitTagUpdateParams {
  /**
   * Optional new commit ID to move the tag to
   */
  commit_id?: string | null;

  /**
   * Optional new description for the tag. Send `null` to clear an existing
   * description.
   */
  description?: string | null;
}

export declare namespace CommitTags {
  export {
    type CreateTagRequest as CreateTagRequest,
    type CreateTagResponse as CreateTagResponse,
    type ListTagsResponse as ListTagsResponse,
    type TagInfo as TagInfo,
    type UpdateTagRequest as UpdateTagRequest,
    type CommitTagCreateParams as CommitTagCreateParams,
    type CommitTagUpdateParams as CommitTagUpdateParams,
  };
}
