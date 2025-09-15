// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'vers-mcp/filtering';
import { Metadata, asTextContentResult } from 'vers-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Vers from 'vers';

export const metadata: Metadata = {
  resource: 'api.cluster',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/cluster/{cluster_id_or_alias}',
  operationId: 'get_cluster',
};

export const tool: Tool = {
  name: 'retrieve_api_cluster',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve information on a particular cluster.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The cluster\\'s ID.'\n        },\n        fs_size_mib: {\n          type: 'integer',\n          description: 'The size of the cluster\\'s backing file'\n        },\n        root_vm_id: {\n          type: 'string',\n          description: 'The ID of the cluster\\'s root VM.'\n        },\n        vm_count: {\n          type: 'integer',\n          description: 'How many VMs are currently running on this cluster.'\n        },\n        vms: {\n          type: 'array',\n          description: 'The VMs that are children of the cluster, including the root VM.',\n          items: {\n            $ref: '#/$defs/vm_dto'\n          }\n        },\n        alias: {\n          type: 'string',\n          description: 'Human-readable name assigned to the cluster.'\n        }\n      },\n      required: [        'id',\n        'fs_size_mib',\n        'root_vm_id',\n        'vm_count',\n        'vms'\n      ]\n    },\n    duration_ns: {\n      type: 'integer'\n    },\n    operation_code: {\n      type: 'string',\n      enum: [        'list_clusters',\n        'get_cluster',\n        'create_cluster',\n        'delete_cluster',\n        'update_cluster',\n        'get_cluster_ssh_key',\n        'list_vms',\n        'get_vm',\n        'update_vm',\n        'branch_vm',\n        'commit_vm',\n        'delete_vm',\n        'get_vm_ssh_key',\n        'upload_rootfs',\n        'delete_rootfs',\n        'list_rootfs'\n      ]\n    },\n    operation_id: {\n      type: 'string'\n    },\n    time_start: {\n      type: 'integer',\n      description: 'Unix epoch time (secs)'\n    }\n  },\n  required: [    'data',\n    'duration_ns',\n    'operation_code',\n    'operation_id',\n    'time_start'\n  ],\n  $defs: {\n    vm_dto: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the VM.'\n        },\n        children: {\n          type: 'array',\n          description: 'The IDs of direct children branched from this VM.',\n          items: {\n            type: 'string'\n          }\n        },\n        cluster_id: {\n          type: 'string',\n          description: 'The VM\\'s cluster ID'\n        },\n        fs_size_mib: {\n          type: 'integer',\n          description: 'What is the size of the \"disk\" allocated to this VM'\n        },\n        ip_address: {\n          type: 'string',\n          description: 'The VM\\'s local IP address on the VM subnet'\n        },\n        mem_size_mib: {\n          type: 'integer',\n          description: 'How much RAM is allocated to this VM'\n        },\n        network_info: {\n          type: 'object',\n          description: 'The VM\\'s network configuration',\n          properties: {\n            guest_ip: {\n              type: 'string'\n            },\n            guest_mac: {\n              type: 'string'\n            },\n            ssh_port: {\n              type: 'integer'\n            },\n            tap0_ip: {\n              type: 'string'\n            },\n            tap0_name: {\n              type: 'string'\n            },\n            vm_namespace: {\n              type: 'string'\n            }\n          },\n          required: [            'guest_ip',\n            'guest_mac',\n            'ssh_port',\n            'tap0_ip',\n            'tap0_name',\n            'vm_namespace'\n          ]\n        },\n        state: {\n          type: 'string',\n          description: 'Whether the VM is running, paused, or not started.',\n          enum: [            'Not started',\n            'Running',\n            'Paused'\n          ]\n        },\n        vcpu_count: {\n          type: 'integer',\n          description: 'How many vCPUs were allocated to this VM'\n        },\n        alias: {\n          type: 'string',\n          description: 'Human-readable name assigned to the VM.'\n        },\n        parent_id: {\n          type: 'string',\n          description: 'The parent VM\\'s ID, if present. If None, then this VM is a root VM.'\n        }\n      },\n      required: [        'id',\n        'children',\n        'cluster_id',\n        'fs_size_mib',\n        'ip_address',\n        'mem_size_mib',\n        'network_info',\n        'state',\n        'vcpu_count'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      cluster_id_or_alias: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['cluster_id_or_alias'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Vers, args: Record<string, unknown> | undefined) => {
  const { cluster_id_or_alias, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.api.cluster.retrieve(cluster_id_or_alias)),
  );
};

export default { metadata, tool, handler };
