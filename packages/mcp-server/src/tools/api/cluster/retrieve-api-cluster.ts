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
  name: 'retrieve_api_cluster',
  description: 'Retrieve information on a particular cluster.',
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
  return client.api.cluster.retrieve(cluster_id);
};

export default { metadata, tool, handler };
