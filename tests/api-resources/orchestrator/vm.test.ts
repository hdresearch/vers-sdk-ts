// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Vers from 'vers';

const client = new Vers({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource vm', () => {
  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.orchestrator.vm.delete('vm_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('branch', async () => {
    const responsePromise = client.orchestrator.vm.branch('vm_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('commit', async () => {
    const responsePromise = client.orchestrator.vm.commit('vm_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createRoot: only required params', async () => {
    const responsePromise = client.orchestrator.vm.createRoot({ vm_config: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createRoot: required and optional params', async () => {
    const response = await client.orchestrator.vm.createRoot({
      vm_config: {
        fs_size_mib: 0,
        image_name: 'image_name',
        kernel_name: 'kernel_name',
        mem_size_mib: 0,
        vcpu_count: 0,
      },
    });
  });

  // Prism tests are disabled
  test.skip('restoreFromCommit: only required params', async () => {
    const responsePromise = client.orchestrator.vm.restoreFromCommit({
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

  // Prism tests are disabled
  test.skip('restoreFromCommit: required and optional params', async () => {
    const response = await client.orchestrator.vm.restoreFromCommit({
      commit_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Prism tests are disabled
  test.skip('updateState: only required params', async () => {
    const responsePromise = client.orchestrator.vm.updateState('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  // Prism tests are disabled
  test.skip('updateState: required and optional params', async () => {
    const response = await client.orchestrator.vm.updateState('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      state: 'Paused',
    });
  });
});
