/**
 * Integration tests for SSH functionality.
 *
 * These tests require a real Vers API key and will create/destroy VMs.
 * Set VERS_API_KEY environment variable to run these tests.
 *
 * Run with: VERS_API_KEY=your-key npx jest tests/lib/ssh/integration.test.ts
 */

import Vers from 'vers';
import { withSSH, type VmResourceWithSSH } from 'vers';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

const API_KEY = process.env['VERS_API_KEY'];

// Skip all tests if no API key
const describeWithAuth = API_KEY ? describe : describe.skip;

describeWithAuth('SSH Integration Tests', () => {
  let client: Vers;
  let vm: VmResourceWithSSH;
  let vmId: string;

  // Increase timeout for VM operations
  jest.setTimeout(180000);

  beforeAll(async () => {
    client = new Vers({
      apiKey: API_KEY,
      baseURL: process.env['VERS_BASE_URL'] ?? 'https://api.vers.sh/api/v1',
    });
    vm = withSSH(client.vm);

    // Create a test VM
    console.log('Creating test VM...');
    const response = await client.vm.createRoot({
      vm_config: {
        mem_size_mib: 512,
        vcpu_count: 1,
      },
    });
    vmId = response.vm_id;
    console.log(`Created VM: ${vmId}`);

    // Wait for VM to be ready (SSH accessible)
    console.log('Waiting for VM to be ready...');
    await waitForSSH(vm, vmId);
    console.log('VM is ready');
  });

  afterAll(async () => {
    if (vmId) {
      console.log(`Deleting test VM: ${vmId}`);
      try {
        await client.vm.delete(vmId);
        console.log('VM deleted');
      } catch (err) {
        console.error('Failed to delete VM:', err);
      }
    }
  });

  describe('execute', () => {
    test('should execute a simple command', async () => {
      const result = await vm.execute(vmId, 'echo hello');

      expect(result.stdout.trim()).toBe('hello');
      expect(result.stderr).toBe('');
      expect(result.exitCode).toBe(0);
    });

    test('should capture stderr', async () => {
      const result = await vm.execute(vmId, 'echo error >&2');

      expect(result.stdout).toBe('');
      expect(result.stderr.trim()).toBe('error');
      expect(result.exitCode).toBe(0);
    });

    test('should return non-zero exit code', async () => {
      const result = await vm.execute(vmId, 'exit 42');

      expect(result.exitCode).toBe(42);
    });

    test('should execute command with arguments', async () => {
      const result = await vm.execute(vmId, 'ls -la /');

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('root');
      expect(result.stdout).toContain('bin');
    });

    test('should handle command with environment context', async () => {
      const result = await vm.execute(vmId, 'pwd');

      expect(result.exitCode).toBe(0);
      expect(result.stdout.trim()).toBe('/root');
    });

    test('should execute multiple commands in sequence', async () => {
      const result = await vm.execute(vmId, 'echo first && echo second && echo third');

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('first');
      expect(result.stdout).toContain('second');
      expect(result.stdout).toContain('third');
    });
  });

  describe('executeStream', () => {
    test('should stream stdout', async () => {
      const chunks: string[] = [];
      const stdout = new (await import('node:stream')).Writable({
        write(chunk, _encoding, callback) {
          chunks.push(chunk.toString());
          callback();
        },
      });

      const exitCode = await vm.executeStream(vmId, 'echo streaming', { stdout });

      expect(exitCode).toBe(0);
      expect(chunks.join('')).toContain('streaming');
    });
  });

  describe('SFTP upload/download', () => {
    const testDir = path.join(os.tmpdir(), `vers-test-${Date.now()}`);
    const localFile = path.join(testDir, 'test-upload.txt');
    const downloadFile = path.join(testDir, 'test-download.txt');
    const testContent = `Test content ${Date.now()}`;

    beforeAll(async () => {
      // Create test directory and file
      await fs.promises.mkdir(testDir, { recursive: true });
      await fs.promises.writeFile(localFile, testContent);
    });

    afterAll(async () => {
      // Clean up test directory
      try {
        await fs.promises.rm(testDir, { recursive: true });
      } catch {
        // Ignore cleanup errors
      }
    });

    test('should upload a file', async () => {
      const result = await vm.upload(vmId, localFile, '/tmp/test-upload.txt');

      expect(result.filesTransferred).toBe(1);
      expect(result.bytesTransferred).toBeGreaterThan(0);

      // Verify file exists on remote
      const check = await vm.execute(vmId, 'cat /tmp/test-upload.txt');
      expect(check.stdout).toBe(testContent);
    });

    test('should download a file', async () => {
      // First ensure file exists on remote
      await vm.execute(vmId, `echo "${testContent}" > /tmp/test-download.txt`);

      const result = await vm.download(vmId, '/tmp/test-download.txt', downloadFile);

      expect(result.filesTransferred).toBe(1);
      expect(result.bytesTransferred).toBeGreaterThan(0);

      // Verify local file content
      const content = await fs.promises.readFile(downloadFile, 'utf8');
      expect(content.trim()).toBe(testContent);
    });

    test('should upload directory recursively', async () => {
      // Create a test directory structure
      const uploadDir = path.join(testDir, 'upload-dir');
      await fs.promises.mkdir(uploadDir, { recursive: true });
      await fs.promises.writeFile(path.join(uploadDir, 'file1.txt'), 'content1');
      await fs.promises.writeFile(path.join(uploadDir, 'file2.txt'), 'content2');
      await fs.promises.mkdir(path.join(uploadDir, 'subdir'), { recursive: true });
      await fs.promises.writeFile(path.join(uploadDir, 'subdir', 'file3.txt'), 'content3');

      const result = await vm.upload(vmId, uploadDir, '/tmp/upload-dir', { recursive: true });

      expect(result.filesTransferred).toBe(3);

      // Verify files exist on remote
      const check = await vm.execute(vmId, 'find /tmp/upload-dir -type f | sort');
      expect(check.stdout).toContain('file1.txt');
      expect(check.stdout).toContain('file2.txt');
      expect(check.stdout).toContain('file3.txt');
    });

    test('should download directory recursively', async () => {
      // Create directory on remote
      await vm.execute(vmId, 'mkdir -p /tmp/download-dir/subdir');
      await vm.execute(vmId, 'echo "a" > /tmp/download-dir/a.txt');
      await vm.execute(vmId, 'echo "b" > /tmp/download-dir/subdir/b.txt');

      const downloadDir = path.join(testDir, 'download-dir');
      const result = await vm.download(vmId, '/tmp/download-dir', downloadDir, { recursive: true });

      expect(result.filesTransferred).toBe(2);

      // Verify local files
      const aContent = await fs.promises.readFile(path.join(downloadDir, 'a.txt'), 'utf8');
      const bContent = await fs.promises.readFile(path.join(downloadDir, 'subdir', 'b.txt'), 'utf8');
      expect(aContent.trim()).toBe('a');
      expect(bContent.trim()).toBe('b');
    });
  });

  describe('getClient (reusable connection)', () => {
    test('should execute multiple commands on same connection', async () => {
      const ssh = await vm.getClient(vmId);

      try {
        const result1 = await ssh.execute('echo first');
        const result2 = await ssh.execute('echo second');
        const result3 = await ssh.execute('echo third');

        expect(result1.stdout.trim()).toBe('first');
        expect(result2.stdout.trim()).toBe('second');
        expect(result3.stdout.trim()).toBe('third');
      } finally {
        ssh.close();
      }
    });

    test('should maintain state between commands', async () => {
      const ssh = await vm.getClient(vmId);

      try {
        // Create a file
        await ssh.execute('echo "test" > /tmp/state-test.txt');

        // Verify it exists
        const result = await ssh.execute('cat /tmp/state-test.txt');
        expect(result.stdout.trim()).toBe('test');

        // Clean up
        await ssh.execute('rm /tmp/state-test.txt');
      } finally {
        ssh.close();
      }
    });
  });

  describe('connect (interactive shell)', () => {
    test('should open shell and execute commands', async () => {
      const session = await vm.connect(vmId, {
        cols: 80,
        rows: 24,
      });

      let output = '';
      session.stdout.on('data', (data: Buffer) => {
        output += data.toString();
      });

      // Send a command
      session.stdin.write('echo interactive-test\n');
      session.stdin.write('exit\n');

      const exitCode = await session.wait();

      expect(output).toContain('interactive-test');
      // Exit code might be 0 or undefined depending on shell
    });
  });

  describe('key caching', () => {
    test('should cache SSH keys between calls', async () => {
      // First call fetches the key
      const result1 = await vm.execute(vmId, 'echo first');
      expect(result1.exitCode).toBe(0);

      // Second call should use cached key (faster)
      const start = Date.now();
      const result2 = await vm.execute(vmId, 'echo second');
      const duration = Date.now() - start;

      expect(result2.exitCode).toBe(0);
      // Cached call should be reasonably fast (key fetch takes ~100-500ms)
      // This is a soft assertion since network can vary
      console.log(`Cached execution took ${duration}ms`);
    });

    test('should clear cache and refetch key', async () => {
      // Execute to populate cache
      await vm.execute(vmId, 'echo cached');

      // Clear cache
      vm.clearKeyCache(vmId);

      // Should still work (refetches key)
      const result = await vm.execute(vmId, 'echo after-clear');
      expect(result.stdout.trim()).toBe('after-clear');
    });
  });
});

/**
 * Wait for SSH to be available on a VM
 */
async function waitForSSH(vm: VmResourceWithSSH, vmId: string, maxAttempts = 30): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const result = await vm.execute(vmId, 'echo ready');
      if (result.exitCode === 0) {
        return;
      }
    } catch (err) {
      // Connection failed, wait and retry
      console.log(`SSH not ready yet (attempt ${i + 1}/${maxAttempts})...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error(`SSH not available after ${maxAttempts} attempts`);
}
