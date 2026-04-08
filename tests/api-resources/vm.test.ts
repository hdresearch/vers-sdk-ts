// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Vers from 'vers';

const client = new Vers({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource vm', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.vm.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.vm.delete('vm_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vm.delete('vm_id', { skip_wait_boot: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Vers.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('branch', async () => {
    const responsePromise = client.vm.branch('vm_or_commit_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('branch: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vm.branch(
        'vm_or_commit_id',
        {
          count: 0,
          keep_paused: true,
          skip_wait_boot: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Vers.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('branchByCommit', async () => {
    const responsePromise = client.vm.branchByCommit('commit_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('branchByCommit: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vm.branchByCommit('commit_id', { count: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Vers.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('branchByTag', async () => {
    const responsePromise = client.vm.branchByTag('tag_name');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('branchByTag: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vm.branchByTag('tag_name', { count: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Vers.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('branchByVm', async () => {
    const responsePromise = client.vm.branchByVm('vm_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('branchByVm: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vm.branchByVm(
        'vm_id',
        {
          count: 0,
          keep_paused: true,
          skip_wait_boot: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Vers.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('commit', async () => {
    const responsePromise = client.vm.commit('vm_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createRoot: only required params', async () => {
    const responsePromise = client.vm.createRoot({ vm_config: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createRoot: required and optional params', async () => {
    const response = await client.vm.createRoot({
      vm_config: {
        fs_size_mib: 0,
        image_name: 'image_name',
        kernel_name: 'kernel_name',
        mem_size_mib: 0,
        vcpu_count: 0,
      },
      wait_boot: true,
    });
  });

  // Mock server tests are disabled
  test.skip('exec: only required params', async () => {
    const responsePromise = client.vm.exec('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { command: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('exec: required and optional params', async () => {
    const response = await client.vm.exec('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      command: ['string'],
      env: { foo: 'string' },
      exec_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      stdin: 'stdin',
      timeout_secs: 0,
      working_dir: 'working_dir',
    });
  });

  // Mock server tests are disabled
  test.skip('execStream: only required params', async () => {
    const responsePromise = client.vm.execStream('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      command: ['string'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('execStream: required and optional params', async () => {
    const response = await client.vm.execStream('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      command: ['string'],
      env: { foo: 'string' },
      exec_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      stdin: 'stdin',
      timeout_secs: 0,
      working_dir: 'working_dir',
    });
  });

  // Mock server tests are disabled
  test.skip('execStreamAttach: only required params', async () => {
    const responsePromise = client.vm.execStreamAttach('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      exec_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('execStreamAttach: required and optional params', async () => {
    const response = await client.vm.execStreamAttach('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      exec_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      cursor: 0,
      from_latest: true,
    });
  });

  // Mock server tests are disabled
  test.skip('getLogs', async () => {
    const responsePromise = client.vm.getLogs('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getLogs: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vm.getLogs(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          max_entries: 0,
          offset: 0,
          stream: 'stream',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Vers.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('getMetadata', async () => {
    const responsePromise = client.vm.getMetadata('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getSSHKey', async () => {
    const responsePromise = client.vm.getSSHKey('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('resizeDisk: only required params', async () => {
    const responsePromise = client.vm.resizeDisk('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { fs_size_mib: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('resizeDisk: required and optional params', async () => {
    const response = await client.vm.resizeDisk('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      fs_size_mib: 0,
      skip_wait_boot: true,
    });
  });

  // Mock server tests are disabled
  test.skip('restoreFromCommit: only required params', async () => {
    const responsePromise = client.vm.restoreFromCommit({
      commit_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('restoreFromCommit: required and optional params', async () => {
    const response = await client.vm.restoreFromCommit({ commit_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
  });

  // Mock server tests are disabled
  test.skip('status', async () => {
    const responsePromise = client.vm.status('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updateState: only required params', async () => {
    const responsePromise = client.vm.updateState('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      state: 'Paused',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updateState: required and optional params', async () => {
    const response = await client.vm.updateState('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      state: 'Paused',
      skip_wait_boot: true,
    });
  });
});
