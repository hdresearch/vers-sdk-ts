// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'vers-mcp/filtering';
import { Metadata, asTextContentResult } from 'vers-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.rootfs',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/rootfs/{rootfs_id}',
  operationId: 'delete_rootfs',
};

export const tool: Tool = {
  name: 'delete_api_rootfs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete an existing rootfs from the server.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      properties: {\n        rootfs_name: {\n          type: 'string'\n        }\n      },\n      required: [        'rootfs_name'\n      ]\n    },\n    duration_ns: {\n      type: 'integer'\n    },\n    operation_code: {\n      type: 'string',\n      enum: [        'list_clusters',\n        'get_cluster',\n        'create_cluster',\n        'delete_cluster',\n        'update_cluster',\n        'get_cluster_ssh_key',\n        'list_vms',\n        'get_vm',\n        'update_vm',\n        'branch_vm',\n        'commit_vm',\n        'delete_vm',\n        'get_vm_ssh_key',\n        'upload_rootfs',\n        'delete_rootfs',\n        'list_rootfs'\n      ]\n    },\n    operation_id: {\n      type: 'string'\n    },\n    time_start: {\n      type: 'integer',\n      description: 'Unix epoch time (secs)'\n    }\n  },\n  required: [    'data',\n    'duration_ns',\n    'operation_code',\n    'operation_id',\n    'time_start'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      rootfs_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['rootfs_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Vers, args: Record<string, unknown> | undefined) => {
  const { rootfs_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.api.rootfs.delete(rootfs_id)));
};

export default { metadata, tool, handler };
