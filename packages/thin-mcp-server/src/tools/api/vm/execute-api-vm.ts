// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Vers from 'vers';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { NodeSSH } from 'node-ssh';

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
  const { vm_id, command } = args as any;

  try {
    // 1. Get VM details to retrieve SSH port
    const vm = await client.api.vm.retrieve(vm_id);

    if (!vm?.network_info?.ssh_port) {
      throw new Error('SSH port is not available for this VM.');
    }

    // 2. Get SSH Key
    const sshKey = await client.api.vm.getSSHKey(vm_id);

    if (!sshKey) {
      throw new Error('Failed to retrieve SSH key for the VM.');
    }

    // 3. Save SSH key to a temporary file
    const tmpDir = tmpdir();
    const keyPath = join(tmpDir, `ssh_key_${vm_id}`); // Unique key path
    await writeFile(keyPath, sshKey, { mode: 0o600 }); // Ensure proper permissions

    // 4. Execute command via SSH
    const hostIP = client.versURL; // Assuming versURL is the host IP
    const sshPort = vm.network_info.ssh_port;

    const sshClient = new NodeSSH()

    await sshClient.connect({
      host: hostIP,
      port: sshPort,
      username: 'root',
      privateKeyPath: keyPath
    })

    const result = await sshClient.execCommand(command)

    // 5. Clean up the temporary key file
    await unlink(keyPath);

    return { result: result.stdout };
  } catch (error: any) {
    console.error('Error executing command via SSH:', error);
    throw new Error(`Failed to execute command: ${error.message}`);
  }
};

export default { metadata, tool, handler };
