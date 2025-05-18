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
    name: 'list_completed_sessions',
    description: 'List all completed command sessions.',
    inputSchema: {
        type: 'object',
        properties: {},
    },
};

export const handler = async () => {

    const sessions = terminalManager.listCompletedSessions();
    return {
        content: [{
            type: "text",
            text: sessions.length === 0
                ? 'No active sessions. Check completed sessions with `list_completed_sessions`.'
                : sessions.map(s =>
                    `PID: ${s.pid}, Output: ${s.output}, Exit Code: ${s.exitCode}, Runtime: ${Math.round(s.endTime.getTime() - s.startTime.getTime()) / 1000}s}`
                ).join('\n')
        }],
    };

};

export default { metadata, tool, handler };
