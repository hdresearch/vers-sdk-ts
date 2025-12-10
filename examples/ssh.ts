/**
 * SSH Examples for Vers SDK
 *
 * This file demonstrates how to use the SSH functionality to interact with VMs.
 *
 * Run with:
 *   VERS_API_KEY=your-key npx ts-node examples/ssh.ts
 */

import Vers, { withSSH } from 'vers';

async function main() {
  // Initialize client with SSH support
  const client = new Vers({
    baseURL: 'https://api.vers.sh/api/v1',
  });
  const vm = withSSH(client.vm);

  // Create a new VM
  console.log('Creating VM...');
  const { vm_id: vmId } = await client.vm.createRoot({
    vm_config: {
      mem_size_mib: 512,
      vcpu_count: 1,
    },
  });
  console.log(`Created VM: ${vmId}`);

  try {
    // Wait for SSH to be ready
    console.log('Waiting for SSH...');
    await waitForSSH(vm, vmId);
    console.log('SSH ready!');

    // ============================================
    // Example 1: Execute a simple command
    // ============================================
    console.log('\n--- Execute Command ---');
    const result = await vm.execute(vmId, 'uname -a');
    console.log('stdout:', result.stdout);
    console.log('exit code:', result.exitCode);

    // ============================================
    // Example 2: Execute with streaming output
    // ============================================
    console.log('\n--- Streaming Output ---');
    const exitCode = await vm.executeStream(vmId, 'for i in 1 2 3; do echo "Count: $i"; sleep 0.5; done', {
      stdout: process.stdout,
      stderr: process.stderr,
    });
    console.log('exit code:', exitCode);

    // ============================================
    // Example 3: Upload and download files
    // ============================================
    console.log('\n--- SFTP File Transfer ---');

    // Create a local test file
    const fs = await import('node:fs/promises');
    const os = await import('node:os');
    const path = await import('node:path');

    const testDir = path.join(os.tmpdir(), `vers-example-${Date.now()}`);
    await fs.mkdir(testDir, { recursive: true });

    const localFile = path.join(testDir, 'hello.txt');
    await fs.writeFile(localFile, 'Hello from Vers SDK!');

    // Upload file
    const uploadResult = await vm.upload(vmId, localFile, '/tmp/hello.txt');
    console.log(`Uploaded ${uploadResult.filesTransferred} file(s), ${uploadResult.bytesTransferred} bytes`);

    // Verify on remote
    const catResult = await vm.execute(vmId, 'cat /tmp/hello.txt');
    console.log('Remote content:', catResult.stdout);

    // Download file
    const downloadPath = path.join(testDir, 'downloaded.txt');
    const downloadResult = await vm.download(vmId, '/tmp/hello.txt', downloadPath);
    console.log(
      `Downloaded ${downloadResult.filesTransferred} file(s), ${downloadResult.bytesTransferred} bytes`,
    );

    // Verify downloaded content
    const downloadedContent = await fs.readFile(downloadPath, 'utf8');
    console.log('Downloaded content:', downloadedContent);

    // Cleanup
    await fs.rm(testDir, { recursive: true });

    // ============================================
    // Example 4: Reusable connection for batching
    // ============================================
    console.log('\n--- Reusable Connection ---');
    const ssh = await vm.getClient(vmId);
    try {
      // Execute multiple commands on the same connection
      await ssh.execute('echo "Installing packages..."');
      await ssh.execute('mkdir -p /opt/myapp');
      await ssh.execute('echo "app_version=1.0.0" > /opt/myapp/config');

      const config = await ssh.execute('cat /opt/myapp/config');
      console.log('Config:', config.stdout);
    } finally {
      ssh.close();
    }

    // ============================================
    // Example 5: Interactive shell
    // ============================================
    console.log('\n--- Interactive Shell ---');
    const session = await vm.connect(vmId, { cols: 80, rows: 24 });

    // Collect output
    let output = '';
    session.stdout.on('data', (data: Buffer) => {
      output += data.toString();
    });

    // Send commands
    session.stdin.write('echo "Hello from interactive shell!"\n');
    session.stdin.write('pwd\n');
    session.stdin.write('exit\n');

    // Wait for shell to exit
    await session.wait();
    console.log('Shell output:', output);
  } finally {
    // Clean up VM
    console.log('\nDeleting VM...');
    await client.vm.delete(vmId);
    console.log('Done!');
  }
}

/**
 * Wait for SSH to become available on a VM
 */
async function waitForSSH(vm: ReturnType<typeof withSSH>, vmId: string, maxAttempts = 30): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const result = await vm.execute(vmId, 'echo ready');
      if (result.exitCode === 0) return;
    } catch {
      console.log(`  Attempt ${i + 1}/${maxAttempts}...`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  throw new Error('SSH not available');
}

main().catch(console.error);
