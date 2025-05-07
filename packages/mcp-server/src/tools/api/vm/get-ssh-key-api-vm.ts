// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.vm',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'get_ssh_key_api_vm',
  description: 'Get the SSH private key for VM access',
  inputSchema: {
    type: 'object',
    properties: {
      vm_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Vers, args: Record<string, unknown> | undefined) => {
  const { vm_id, ...body } = args as any;
  return client.api.vm.getSSHKey(vm_id);
};

export default { metadata, tool, handler };
