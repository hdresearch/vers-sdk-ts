// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.vm',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'commit_api_vm',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      vm_id: {
        type: 'string',
      },
      body: {
        type: 'object',
      },
    },
  },
};

export const handler = (client: Vers, args: Record<string, unknown> | undefined) => {
  const { vm_id, ...body } = args as any;
  return client.api.vm.commit(vm_id, body);
};

export default { metadata, tool, handler };
