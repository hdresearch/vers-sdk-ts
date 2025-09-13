// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'vers-mcp/filtering';
import { Metadata, asTextContentResult } from 'vers-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.vm',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/vm/{vm_id_or_alias}',
  operationId: 'delete_vm',
};

export const tool: Tool = {
  name: 'delete_api_vm',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete a VM.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      description: 'A struct containing information about an attempted VM deletion request. Reports information\\nin the event of a partial failure so billing can still be udpated appropriately.',\n      properties: {\n        deleted_ids: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        errors: {\n          type: 'array',\n          items: {\n            type: 'object',\n            description: 'Contains a VM ID and the reason that it could not be deleted.',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              error: {\n                type: 'string'\n              }\n            },\n            required: [              'id',\n              'error'\n            ]\n          }\n        }\n      },\n      required: [        'deleted_ids',\n        'errors'\n      ]\n    },\n    duration_ns: {\n      type: 'integer'\n    },\n    operation_code: {\n      type: 'string',\n      enum: [        'list_clusters',\n        'get_cluster',\n        'create_cluster',\n        'delete_cluster',\n        'update_cluster',\n        'get_cluster_ssh_key',\n        'list_vms',\n        'get_vm',\n        'update_vm',\n        'branch_vm',\n        'commit_vm',\n        'delete_vm',\n        'get_vm_ssh_key',\n        'upload_rootfs',\n        'delete_rootfs',\n        'list_rootfs'\n      ]\n    },\n    operation_id: {\n      type: 'string'\n    },\n    time_start: {\n      type: 'integer',\n      description: 'Unix epoch time (secs)'\n    }\n  },\n  required: [    'data',\n    'duration_ns',\n    'operation_code',\n    'operation_id',\n    'time_start'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      vm_id_or_alias: {
        type: 'string',
      },
      recursive: {
        type: 'boolean',
        description: 'Delete children recursively',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['vm_id_or_alias', 'recursive'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Vers, args: Record<string, unknown> | undefined) => {
  const { vm_id_or_alias, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.api.vm.delete(vm_id_or_alias, body)));
};

export default { metadata, tool, handler };
