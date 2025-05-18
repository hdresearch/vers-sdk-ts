// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Vers from 'vers';

import { terminalManager } from '../../../terminal-manager';

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

export const handler = async (client: Vers, args: Record<string, unknown> | undefined) => {

  // get the command's pid so it's easy to query, and return that to the user
  const result = terminalManager.executeCommand(client, args);
  return {
    result: 'Command is executing. Run `list_active_sessions` to see progress.'
  }


};

export default { metadata, tool, handler };
