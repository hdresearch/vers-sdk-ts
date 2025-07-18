// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_api_cluster from './api/cluster/create-api-cluster';
import retrieve_api_cluster from './api/cluster/retrieve-api-cluster';
import update_api_cluster from './api/cluster/update-api-cluster';
import list_api_cluster from './api/cluster/list-api-cluster';
import delete_api_cluster from './api/cluster/delete-api-cluster';
import get_ssh_key_api_cluster from './api/cluster/get-ssh-key-api-cluster';
import retrieve_api_vm from './api/vm/retrieve-api-vm';
import update_api_vm from './api/vm/update-api-vm';
import list_api_vm from './api/vm/list-api-vm';
import delete_api_vm from './api/vm/delete-api-vm';
import branch_api_vm from './api/vm/branch-api-vm';
import commit_api_vm from './api/vm/commit-api-vm';
import get_ssh_key_api_vm from './api/vm/get-ssh-key-api-vm';
import list_api_rootfs from './api/rootfs/list-api-rootfs';
import delete_api_rootfs from './api/rootfs/delete-api-rootfs';
import upload_api_rootfs from './api/rootfs/upload-api-rootfs';
import check_api_health from './api/health/check-api-health';
import get_info_api_telemetry from './api/telemetry/get-info-api-telemetry';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_api_cluster);
addEndpoint(retrieve_api_cluster);
addEndpoint(update_api_cluster);
addEndpoint(list_api_cluster);
addEndpoint(delete_api_cluster);
addEndpoint(get_ssh_key_api_cluster);
addEndpoint(retrieve_api_vm);
addEndpoint(update_api_vm);
addEndpoint(list_api_vm);
addEndpoint(delete_api_vm);
addEndpoint(branch_api_vm);
addEndpoint(commit_api_vm);
addEndpoint(get_ssh_key_api_vm);
addEndpoint(list_api_rootfs);
addEndpoint(delete_api_rootfs);
addEndpoint(upload_api_rootfs);
addEndpoint(check_api_health);
addEndpoint(get_info_api_telemetry);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
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
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
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
