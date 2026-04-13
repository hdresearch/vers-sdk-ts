// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Repositories extends APIResource {
  create(body: RepositoryCreateParams, options?: RequestOptions): APIPromise<CreateRepositoryResponse> {
    return this._client.post('/api/v1/repositories', { body, ...options });
  }

  list(options?: RequestOptions): APIPromise<ListRepositoriesResponse> {
    return this._client.get('/api/v1/repositories', options);
  }

  delete(repoName: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v1/repositories/${repoName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  createTag(
    repoName: string,
    body: RepositoryCreateTagParams,
    options?: RequestOptions,
  ): APIPromise<CreateRepoTagResponse> {
    return this._client.post(path`/api/v1/repositories/${repoName}/tags`, { body, ...options });
  }

  deleteTag(tagName: string, params: RepositoryDeleteTagParams, options?: RequestOptions): APIPromise<void> {
    const { repo_name } = params;
    return this._client.delete(path`/api/v1/repositories/${repo_name}/tags/${tagName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  fork(body: RepositoryForkParams, options?: RequestOptions): APIPromise<ForkRepositoryResponse> {
    return this._client.post('/api/v1/repositories/fork', { body, ...options });
  }

  get(repoName: string, options?: RequestOptions): APIPromise<RepositoryInfo> {
    return this._client.get(path`/api/v1/repositories/${repoName}`, options);
  }

  getTag(tagName: string, params: RepositoryGetTagParams, options?: RequestOptions): APIPromise<RepoTagInfo> {
    const { repo_name } = params;
    return this._client.get(path`/api/v1/repositories/${repo_name}/tags/${tagName}`, options);
  }

  listTags(repoName: string, options?: RequestOptions): APIPromise<ListRepoTagsResponse> {
    return this._client.get(path`/api/v1/repositories/${repoName}/tags`, options);
  }

  setVisibility(
    repoName: string,
    body: RepositorySetVisibilityParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.patch(path`/api/v1/repositories/${repoName}/visibility`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  updateTag(tagName: string, params: RepositoryUpdateTagParams, options?: RequestOptions): APIPromise<void> {
    const { repo_name, ...body } = params;
    return this._client.patch(path`/api/v1/repositories/${repo_name}/tags/${tagName}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Request body for creating a tag within a repository: POST
 * /api/v1/repositories/{repo_name}/tags
 */
export interface CreateRepoTagRequest {
  /**
   * The commit ID this tag should point to
   */
  commit_id: string;

  /**
   * The tag name (e.g. "latest", "v1.0")
   */
  tag_name: string;

  /**
   * Optional description of what this tag represents
   */
  description?: string | null;
}

/**
 * Response body for POST /api/v1/repositories/{repo_name}/tags
 */
export interface CreateRepoTagResponse {
  /**
   * The commit ID this tag points to
   */
  commit_id: string;

  /**
   * Full reference in image_name:tag format
   */
  reference: string;

  /**
   * The ID of the newly created tag
   */
  tag_id: string;
}

/**
 * Request body for POST /api/v1/repositories
 */
export interface CreateRepositoryRequest {
  /**
   * The name of the repository (alphanumeric, hyphens, underscores, dots, 1-64
   * chars)
   */
  name: string;

  /**
   * Optional description of the repository
   */
  description?: string | null;
}

/**
 * Response body for POST /api/v1/repositories
 */
export interface CreateRepositoryResponse {
  /**
   * The name of the repository
   */
  name: string;

  /**
   * The ID of the newly created repository
   */
  repo_id: string;
}

/**
 * Request body for POST /api/v1/repositories/fork
 */
export interface ForkRepositoryRequest {
  /**
   * The organization that owns the source public repository
   */
  source_org: string;

  /**
   * The source repository name
   */
  source_repo: string;

  /**
   * The tag to fork (e.g. "latest", "v1.0")
   */
  source_tag: string;

  /**
   * Name for the new repository in your org (defaults to source_repo if omitted)
   */
  repo_name?: string | null;

  /**
   * Tag name in the new repo (defaults to source_tag if omitted)
   */
  tag_name?: string | null;
}

/**
 * Response body for POST /api/v1/repositories/fork
 */
export interface ForkRepositoryResponse {
  /**
   * The new commit in your org (snapshot of the forked VM)
   */
  commit_id: string;

  /**
   * Full reference: repo_name:tag_name
   */
  reference: string;

  /**
   * The new repository name in your org
   */
  repo_name: string;

  /**
   * The tag name pointing to the forked commit
   */
  tag_name: string;

  /**
   * The new VM that was created from the fork
   */
  vm_id: string;
}

/**
 * Response body for GET /api/v1/repositories/{repo_name}/tags
 */
export interface ListRepoTagsResponse {
  /**
   * The repository name
   */
  repository: string;

  /**
   * List of tags in this repository
   */
  tags: Array<RepoTagInfo>;
}

/**
 * Response body for GET /api/v1/repositories
 */
export interface ListRepositoriesResponse {
  /**
   * List of all repositories in the user's organization
   */
  repositories: Array<RepositoryInfo>;
}

/**
 * Tag information within a repository context
 */
export interface RepoTagInfo {
  /**
   * The commit ID this tag currently points to
   */
  commit_id: string;

  /**
   * When the tag was created
   */
  created_at: string;

  /**
   * Full reference in image_name:tag format
   */
  reference: string;

  /**
   * The tag's unique identifier
   */
  tag_id: string;

  /**
   * The tag name
   */
  tag_name: string;

  /**
   * When the tag was last updated
   */
  updated_at: string;

  /**
   * Optional description
   */
  description?: string | null;
}

/**
 * Repository information returned in list and get operations
 */
export interface RepositoryInfo {
  /**
   * When the repository was created
   */
  created_at: string;

  /**
   * Whether this repository is publicly visible
   */
  is_public: boolean;

  /**
   * The repository name
   */
  name: string;

  /**
   * The repository's unique identifier
   */
  repo_id: string;

  /**
   * Optional description
   */
  description?: string | null;
}

/**
 * Request body for PATCH /api/v1/repositories/{repo_name}/visibility
 */
export interface SetRepositoryVisibilityRequest {
  /**
   * Whether the repository should be publicly visible
   */
  is_public: boolean;
}

/**
 * Request body for PATCH /api/v1/repositories/{repo_name}/tags/{tag_name}
 */
export interface UpdateRepoTagRequest {
  /**
   * Optional new commit ID to move the tag to
   */
  commit_id?: string | null;

  /**
   * Optional new description for the tag. Send `null` to clear.
   */
  description?: string | null;
}

export interface RepositoryCreateParams {
  /**
   * The name of the repository (alphanumeric, hyphens, underscores, dots, 1-64
   * chars)
   */
  name: string;

  /**
   * Optional description of the repository
   */
  description?: string | null;
}

export interface RepositoryCreateTagParams {
  /**
   * The commit ID this tag should point to
   */
  commit_id: string;

  /**
   * The tag name (e.g. "latest", "v1.0")
   */
  tag_name: string;

  /**
   * Optional description of what this tag represents
   */
  description?: string | null;
}

export interface RepositoryDeleteTagParams {
  /**
   * Repository name
   */
  repo_name: string;
}

export interface RepositoryForkParams {
  /**
   * The organization that owns the source public repository
   */
  source_org: string;

  /**
   * The source repository name
   */
  source_repo: string;

  /**
   * The tag to fork (e.g. "latest", "v1.0")
   */
  source_tag: string;

  /**
   * Name for the new repository in your org (defaults to source_repo if omitted)
   */
  repo_name?: string | null;

  /**
   * Tag name in the new repo (defaults to source_tag if omitted)
   */
  tag_name?: string | null;
}

export interface RepositoryGetTagParams {
  /**
   * Repository name
   */
  repo_name: string;
}

export interface RepositorySetVisibilityParams {
  /**
   * Whether the repository should be publicly visible
   */
  is_public: boolean;
}

export interface RepositoryUpdateTagParams {
  /**
   * Path param: Repository name
   */
  repo_name: string;

  /**
   * Body param: Optional new commit ID to move the tag to
   */
  commit_id?: string | null;

  /**
   * Body param: Optional new description for the tag. Send `null` to clear.
   */
  description?: string | null;
}

export declare namespace Repositories {
  export {
    type CreateRepoTagRequest as CreateRepoTagRequest,
    type CreateRepoTagResponse as CreateRepoTagResponse,
    type CreateRepositoryRequest as CreateRepositoryRequest,
    type CreateRepositoryResponse as CreateRepositoryResponse,
    type ForkRepositoryRequest as ForkRepositoryRequest,
    type ForkRepositoryResponse as ForkRepositoryResponse,
    type ListRepoTagsResponse as ListRepoTagsResponse,
    type ListRepositoriesResponse as ListRepositoriesResponse,
    type RepoTagInfo as RepoTagInfo,
    type RepositoryInfo as RepositoryInfo,
    type SetRepositoryVisibilityRequest as SetRepositoryVisibilityRequest,
    type UpdateRepoTagRequest as UpdateRepoTagRequest,
    type RepositoryCreateParams as RepositoryCreateParams,
    type RepositoryCreateTagParams as RepositoryCreateTagParams,
    type RepositoryDeleteTagParams as RepositoryDeleteTagParams,
    type RepositoryForkParams as RepositoryForkParams,
    type RepositoryGetTagParams as RepositoryGetTagParams,
    type RepositorySetVisibilityParams as RepositorySetVisibilityParams,
    type RepositoryUpdateTagParams as RepositoryUpdateTagParams,
  };
}
