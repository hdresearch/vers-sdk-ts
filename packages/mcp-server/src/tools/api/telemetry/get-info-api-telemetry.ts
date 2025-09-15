// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'vers-mcp/filtering';
import { Metadata, asTextContentResult } from 'vers-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.telemetry',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/telemetry',
  operationId: 'telemetry',
};

export const tool: Tool = {
  name: 'get_info_api_telemetry',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet telemetry information\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/telemetry_dto',\n  $defs: {\n    telemetry_dto: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        cpu_cores_available: {\n          type: 'integer'\n        },\n        cpu_cores_margin: {\n          type: 'integer'\n        },\n        cpu_cores_total: {\n          type: 'integer'\n        },\n        cpu_cores_used: {\n          type: 'integer'\n        },\n        disk_data_mib_available: {\n          type: 'integer'\n        },\n        disk_data_mib_total: {\n          type: 'integer'\n        },\n        disk_vm_mib_available: {\n          type: 'integer'\n        },\n        disk_vm_mib_total: {\n          type: 'integer'\n        },\n        memory_mib_available: {\n          type: 'integer'\n        },\n        memory_mib_margin: {\n          type: 'integer'\n        },\n        memory_mib_total: {\n          type: 'integer'\n        },\n        memory_mib_used: {\n          type: 'integer'\n        },\n        vm_network_count_in_use: {\n          type: 'integer'\n        },\n        vm_network_count_total: {\n          type: 'integer'\n        }\n      },\n      required: [        'id',\n        'cpu_cores_available',\n        'cpu_cores_margin',\n        'cpu_cores_total',\n        'cpu_cores_used',\n        'disk_data_mib_available',\n        'disk_data_mib_total',\n        'disk_vm_mib_available',\n        'disk_vm_mib_total',\n        'memory_mib_available',\n        'memory_mib_margin',\n        'memory_mib_total',\n        'memory_mib_used',\n        'vm_network_count_in_use',\n        'vm_network_count_total'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Vers, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.api.telemetry.getInfo()));
};

export default { metadata, tool, handler };
