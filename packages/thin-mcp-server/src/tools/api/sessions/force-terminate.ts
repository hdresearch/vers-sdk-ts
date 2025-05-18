// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';

import { terminalManager } from '../../../terminal-manager';

export const metadata: Metadata = {
    resource: 'api.sessions',
    operation: 'read',
    tags: [],
};

export const tool: Tool = {
    name: 'list_sessions',
    description: 'List all running command sessions.',
    inputSchema: {
        type: 'object',
        properties: {},
    },
};

export const handler = async () => {

    const sessions = terminalManager.listActiveSessions();
    return {
        content: [{
            type: "text",
            text: sessions.length === 0
                ? 'No active sessions'
                : sessions.map(s =>
                    `PID: ${s.pid}, Blocked: ${s.isBlocked}, Runtime: ${Math.round(s.runtime / 1000)}s`
                ).join('\n')
        }],
    };

};

export default { metadata, tool, handler };
