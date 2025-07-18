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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet telemetry information\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/telemetry_dto',\n  $defs: {\n    telemetry_dto: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        fs_mib_current: {\n          type: 'integer'\n        },\n        fs_mib_max: {\n          type: 'integer'\n        },\n        mem_mib_current: {\n          type: 'integer'\n        },\n        mem_mib_max: {\n          type: 'integer'\n        },\n        vcpu_current: {\n          type: 'integer'\n        },\n        vcpu_max: {\n          type: 'integer'\n        },\n        vm_network_count_in_use: {\n          type: 'integer'\n        },\n        vm_network_count_total: {\n          type: 'integer'\n        }\n      },\n      required: [        'id',\n        'fs_mib_current',\n        'fs_mib_max',\n        'mem_mib_current',\n        'mem_mib_max',\n        'vcpu_current',\n        'vcpu_max',\n        'vm_network_count_in_use',\n        'vm_network_count_total'\n      ]\n    }\n  }\n}\n```",
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
};

export const handler = async (client: Vers, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await maybeFilter(args, await client.api.telemetry.getInfo()));
};

export default { metadata, tool, handler };
