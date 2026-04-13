// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Vers from 'vers';

const client = new Vers({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource publicRepositories', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.publicRepositories.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: only required params', async () => {
    const responsePromise = client.publicRepositories.get('repo_name', { org_name: 'org_name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: required and optional params', async () => {
    const response = await client.publicRepositories.get('repo_name', { org_name: 'org_name' });
  });

  // Mock server tests are disabled
  test.skip('getTag: only required params', async () => {
    const responsePromise = client.publicRepositories.getTag('tag_name', {
      org_name: 'org_name',
      repo_name: 'repo_name',
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
  test.skip('getTag: required and optional params', async () => {
    const response = await client.publicRepositories.getTag('tag_name', {
      org_name: 'org_name',
      repo_name: 'repo_name',
    });
  });

  // Mock server tests are disabled
  test.skip('listTags: only required params', async () => {
    const responsePromise = client.publicRepositories.listTags('repo_name', { org_name: 'org_name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listTags: required and optional params', async () => {
    const response = await client.publicRepositories.listTags('repo_name', { org_name: 'org_name' });
  });
});
