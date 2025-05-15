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
  name: 'list_api_cluster',
  description: 'List all clusters.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Vers, args: Record<string, unknown> | undefined) => {
  return client.api.cluster.list();
};

export default { metadata, tool, handler };
