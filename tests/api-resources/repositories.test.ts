// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Vers from 'vers';

const client = new Vers({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource repositories', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.repositories.create({ name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.repositories.create({ name: 'name', description: 'description' });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.repositories.list();
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
    const responsePromise = client.repositories.delete('repo_name');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createTag: only required params', async () => {
    const responsePromise = client.repositories.createTag('repo_name', {
      commit_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tag_name: 'tag_name',
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
  test.skip('createTag: required and optional params', async () => {
    const response = await client.repositories.createTag('repo_name', {
      commit_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tag_name: 'tag_name',
      description: 'description',
    });
  });

  // Mock server tests are disabled
  test.skip('deleteTag: only required params', async () => {
    const responsePromise = client.repositories.deleteTag('tag_name', { repo_name: 'repo_name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteTag: required and optional params', async () => {
    const response = await client.repositories.deleteTag('tag_name', { repo_name: 'repo_name' });
  });

  // Mock server tests are disabled
  test.skip('fork: only required params', async () => {
    const responsePromise = client.repositories.fork({
      source_org: 'source_org',
      source_repo: 'source_repo',
      source_tag: 'source_tag',
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
  test.skip('fork: required and optional params', async () => {
    const response = await client.repositories.fork({
      source_org: 'source_org',
      source_repo: 'source_repo',
      source_tag: 'source_tag',
      repo_name: 'repo_name',
      tag_name: 'tag_name',
    });
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.repositories.get('repo_name');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getTag: only required params', async () => {
    const responsePromise = client.repositories.getTag('tag_name', { repo_name: 'repo_name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getTag: required and optional params', async () => {
    const response = await client.repositories.getTag('tag_name', { repo_name: 'repo_name' });
  });

  // Mock server tests are disabled
  test.skip('listTags', async () => {
    const responsePromise = client.repositories.listTags('repo_name');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('setVisibility: only required params', async () => {
    const responsePromise = client.repositories.setVisibility('repo_name', { is_public: true });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('setVisibility: required and optional params', async () => {
    const response = await client.repositories.setVisibility('repo_name', { is_public: true });
  });

  // Mock server tests are disabled
  test.skip('updateTag: only required params', async () => {
    const responsePromise = client.repositories.updateTag('tag_name', { repo_name: 'repo_name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('updateTag: required and optional params', async () => {
    const response = await client.repositories.updateTag('tag_name', {
      repo_name: 'repo_name',
      commit_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      description: 'description',
    });
  });
});
