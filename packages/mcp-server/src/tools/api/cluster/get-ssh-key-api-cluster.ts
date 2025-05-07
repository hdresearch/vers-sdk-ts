// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.cluster',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'get_ssh_key_api_cluster',
  description: 'Get the SSH private key for VM access',
  inputSchema: {
    type: 'object',
    properties: {
      cluster_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Vers, args: Record<string, unknown> | undefined) => {
  const { cluster_id, ...body } = args as any;
  return client.api.cluster.getSSHKey(cluster_id);
};

export default { metadata, tool, handler };
