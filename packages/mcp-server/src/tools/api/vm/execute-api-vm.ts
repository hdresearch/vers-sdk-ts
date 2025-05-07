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
  name: 'execute_api_vm',
  description: 'Execute a command on the specified VM.',
  inputSchema: {
    type: 'object',
    properties: {
      vm_id: {
        type: 'string',
      },
      command: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Vers, args: Record<string, unknown> | undefined) => {
  const { vm_id, ...body } = args as any;
  return client.api.vm.execute(vm_id, body);
};

export default { metadata, tool, handler };
