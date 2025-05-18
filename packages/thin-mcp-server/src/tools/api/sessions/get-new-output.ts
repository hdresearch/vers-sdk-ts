// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';

import { terminalManager } from '../../../terminal-manager';
import Vers from 'vers';

export const metadata: Metadata = {
    resource: 'api.sessions',
    operation: 'read',
    tags: [],
};

export const tool: Tool = {
    name: 'get_new_output',
    description: 'Get the output of a running command.',
    inputSchema: {
        type: 'object',
        properties: {
            pid: {
                type: 'integer',
            },
        },
    },
};

export const handler = async (_: Vers, args: Record<string, unknown> | undefined) => {
    const { pid } = args as any;

    const output = terminalManager.getNewOutput(pid);
    return {
        content: [{
            type: "text",
            text: output === null
                ? `No session found for PID ${pid}`
                : output || 'No new output available'
        }],
    };


};

export default { metadata, tool, handler };
