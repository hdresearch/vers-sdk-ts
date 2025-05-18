// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Vers from 'vers';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

import create_api_cluster from './api/cluster/create-api-cluster';
import retrieve_api_cluster from './api/cluster/retrieve-api-cluster';
import list_api_cluster from './api/cluster/list-api-cluster';
import retrieve_api_vm from './api/vm/retrieve-api-vm';
import list_api_vm from './api/vm/list-api-vm';
import commit_api_vm from './api/vm/commit-api-vm';
import create_branch_api_vm from './api/vm/create-branch-api-vm';
import execute_api_vm from './api/vm/execute-api-vm';
import list_sessions from './api/sessions/list-sessions';

export type HandlerFunction = (client: Vers, args: Record<string, unknown> | undefined) => Promise<any>;

export type Metadata = {
  resource: string;
  operation: 'read' | 'write';
  tags: string[];
};

export type Endpoint = {
  metadata: Metadata;
  tool: Tool;
  handler: HandlerFunction;
};

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_api_cluster);
addEndpoint(retrieve_api_cluster);
addEndpoint(list_api_cluster);
addEndpoint(retrieve_api_vm);
addEndpoint(list_api_vm);
addEndpoint(commit_api_vm);
addEndpoint(create_branch_api_vm);
addEndpoint(execute_api_vm);
addEndpoint(list_sessions);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  if (filters.length === 0) {
    return endpoints;
  }

  const allExcludes = filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  if (unmatchedFilters.size > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${[...unmatchedFilters]
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
