// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.cluster',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_api_cluster',
  description: 'Create a new cluster.',
  inputSchema: {
    type: 'object',
    properties: {
      kernel_name: {
        type: 'string',
      },
      mem_size_mib: {
        type: 'integer',
      },
      rootfs_name: {
        type: 'string',
      },
      vcpu_count: {
        type: 'integer',
      },
    },
  },
};

export const handler = (client: Vers, args: Record<string, unknown> | undefined) => {
  const body = { "rootfs_name": "vers-claude" };
  return client.api.cluster.create(body);
};

export default { metadata, tool, handler };
