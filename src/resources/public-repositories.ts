// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as RepositoriesAPI from './repositories';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PublicRepositories extends APIResource {
  list(options?: RequestOptions): APIPromise<ListPublicRepositoriesResponse> {
    return this._client.get('/api/v1/public/repositories', options);
  }

  get(
    repoName: string,
    params: PublicRepositoryGetParams,
    options?: RequestOptions,
  ): APIPromise<PublicRepositoryInfo> {
    const { org_name } = params;
    return this._client.get(path`/api/v1/public/repositories/${org_name}/${repoName}`, options);
  }

  getTag(
    tagName: string,
    params: PublicRepositoryGetTagParams,
    options?: RequestOptions,
  ): APIPromise<RepositoriesAPI.RepoTagInfo> {
    const { org_name, repo_name } = params;
    return this._client.get(
      path`/api/v1/public/repositories/${org_name}/${repo_name}/tags/${tagName}`,
      options,
    );
  }

  listTags(
    repoName: string,
    params: PublicRepositoryListTagsParams,
    options?: RequestOptions,
  ): APIPromise<RepositoriesAPI.ListRepoTagsResponse> {
    const { org_name } = params;
    return this._client.get(path`/api/v1/public/repositories/${org_name}/${repoName}/tags`, options);
  }
}

/**
 * Response body for GET /api/v1/public/repositories
 */
export interface ListPublicRepositoriesResponse {
  repositories: Array<PublicRepositoryInfo>;
}

/**
 * Public repository information (includes owner org name for namespacing)
 */
export interface PublicRepositoryInfo {
  /**
   * When the repository was created
   */
  created_at: string;

  /**
   * Full reference: org_name/repo_name
   */
  full_name: string;

  /**
   * The repository name
   */
  name: string;

  /**
   * The owning organization's name (namespace)
   */
  org_name: string;

  /**
   * The repository's unique identifier
   */
  repo_id: string;

  /**
   * Optional description
   */
  description?: string | null;
}

export interface PublicRepositoryGetParams {
  /**
   * Organization name
   */
  org_name: string;
}

export interface PublicRepositoryGetTagParams {
  /**
   * Organization name
   */
  org_name: string;

  /**
   * Repository name
   */
  repo_name: string;
}

export interface PublicRepositoryListTagsParams {
  /**
   * Organization name
   */
  org_name: string;
}

export declare namespace PublicRepositories {
  export {
    type ListPublicRepositoriesResponse as ListPublicRepositoriesResponse,
    type PublicRepositoryInfo as PublicRepositoryInfo,
    type PublicRepositoryGetParams as PublicRepositoryGetParams,
    type PublicRepositoryGetTagParams as PublicRepositoryGetTagParams,
    type PublicRepositoryListTagsParams as PublicRepositoryListTagsParams,
  };
}
