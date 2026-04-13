# Vm

Types:

- <code><a href="./src/resources/vm.ts">ErrorResponse</a></code>
- <code><a href="./src/resources/vm.ts">NewRootRequest</a></code>
- <code><a href="./src/resources/vm.ts">NewVmResponse</a></code>
- <code><a href="./src/resources/vm.ts">NewVmsResponse</a></code>
- <code><a href="./src/resources/vm.ts">Vm</a></code>
- <code><a href="./src/resources/vm.ts">VmCommitResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmDeleteResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmExecLogQuery</a></code>
- <code><a href="./src/resources/vm.ts">VmExecLogResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmExecRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmExecResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmExecStreamAttachRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmFromCommitRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmMetadataResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmResizeDiskRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmSSHKeyResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmUpdateStateRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmListResponse</a></code>

Methods:

- <code title="get /api/v1/vms">client.vm.<a href="./src/resources/vm.ts">list</a>() -> VmListResponse</code>
- <code title="delete /api/v1/vm/{vm_id}">client.vm.<a href="./src/resources/vm.ts">delete</a>(vmID, { ...params }) -> VmDeleteResponse</code>
- <code title="post /api/v1/vm/{vm_or_commit_id}/branch">client.vm.<a href="./src/resources/vm.ts">branch</a>(vmOrCommitID, { ...params }) -> NewVmsResponse</code>
- <code title="post /api/v1/vm/branch/by_commit/{commit_id}">client.vm.<a href="./src/resources/vm.ts">branchByCommit</a>(commitID, { ...params }) -> NewVmsResponse</code>
- <code title="post /api/v1/vm/branch/by_tag/{tag_name}">client.vm.<a href="./src/resources/vm.ts">branchByTag</a>(tagName, { ...params }) -> NewVmsResponse</code>
- <code title="post /api/v1/vm/branch/by_vm/{vm_id}">client.vm.<a href="./src/resources/vm.ts">branchByVm</a>(vmID, { ...params }) -> NewVmsResponse</code>
- <code title="post /api/v1/vm/{vm_id}/commit">client.vm.<a href="./src/resources/vm.ts">commit</a>(vmID, { ...params }) -> VmCommitResponse</code>
- <code title="post /api/v1/vm/new_root">client.vm.<a href="./src/resources/vm.ts">createRoot</a>({ ...params }) -> NewVmResponse</code>
- <code title="post /api/v1/vm/{vm_id}/exec">client.vm.<a href="./src/resources/vm.ts">exec</a>(vmID, { ...params }) -> VmExecResponse</code>
- <code title="post /api/v1/vm/{vm_id}/exec/stream">client.vm.<a href="./src/resources/vm.ts">execStream</a>(vmID, { ...params }) -> void</code>
- <code title="post /api/v1/vm/{vm_id}/exec/stream/attach">client.vm.<a href="./src/resources/vm.ts">execStreamAttach</a>(vmID, { ...params }) -> void</code>
- <code title="get /api/v1/vm/{vm_id}/logs">client.vm.<a href="./src/resources/vm.ts">getLogs</a>(vmID, { ...params }) -> VmExecLogResponse</code>
- <code title="get /api/v1/vm/{vm_id}/metadata">client.vm.<a href="./src/resources/vm.ts">getMetadata</a>(vmID) -> VmMetadataResponse</code>
- <code title="get /api/v1/vm/{vm_id}/ssh_key">client.vm.<a href="./src/resources/vm.ts">getSSHKey</a>(vmID) -> VmSSHKeyResponse</code>
- <code title="patch /api/v1/vm/{vm_id}/disk">client.vm.<a href="./src/resources/vm.ts">resizeDisk</a>(vmID, { ...params }) -> void</code>
- <code title="post /api/v1/vm/from_commit">client.vm.<a href="./src/resources/vm.ts">restoreFromCommit</a>({ ...params }) -> NewVmResponse</code>
- <code title="get /api/v1/vm/{vm_id}/status">client.vm.<a href="./src/resources/vm.ts">status</a>(vmID) -> Vm</code>
- <code title="patch /api/v1/vm/{vm_id}/state">client.vm.<a href="./src/resources/vm.ts">updateState</a>(vmID, { ...params }) -> void</code>

# Commits

Types:

- <code><a href="./src/resources/commits.ts">CommitInfo</a></code>
- <code><a href="./src/resources/commits.ts">ListCommitsResponse</a></code>
- <code><a href="./src/resources/commits.ts">UpdateCommitRequest</a></code>
- <code><a href="./src/resources/commits.ts">CommitListParentsResponse</a></code>

Methods:

- <code title="patch /api/v1/commits/{commit_id}">client.commits.<a href="./src/resources/commits.ts">update</a>(commitID, { ...params }) -> CommitInfo</code>
- <code title="get /api/v1/commits">client.commits.<a href="./src/resources/commits.ts">list</a>() -> ListCommitsResponse</code>
- <code title="delete /api/v1/commits/{commit_id}">client.commits.<a href="./src/resources/commits.ts">delete</a>(commitID) -> void</code>
- <code title="get /api/v1/vm/commits/{commit_id}/parents">client.commits.<a href="./src/resources/commits.ts">listParents</a>(commitID) -> CommitListParentsResponse</code>
- <code title="get /api/v1/commits/public">client.commits.<a href="./src/resources/commits.ts">listPublic</a>() -> ListCommitsResponse</code>

# CommitTags

Types:

- <code><a href="./src/resources/commit-tags.ts">CreateTagRequest</a></code>
- <code><a href="./src/resources/commit-tags.ts">CreateTagResponse</a></code>
- <code><a href="./src/resources/commit-tags.ts">ListTagsResponse</a></code>
- <code><a href="./src/resources/commit-tags.ts">TagInfo</a></code>
- <code><a href="./src/resources/commit-tags.ts">UpdateTagRequest</a></code>

Methods:

- <code title="post /api/v1/commit_tags">client.commitTags.<a href="./src/resources/commit-tags.ts">create</a>({ ...params }) -> CreateTagResponse</code>
- <code title="patch /api/v1/commit_tags/{tag_name}">client.commitTags.<a href="./src/resources/commit-tags.ts">update</a>(tagName, { ...params }) -> void</code>
- <code title="get /api/v1/commit_tags">client.commitTags.<a href="./src/resources/commit-tags.ts">list</a>() -> ListTagsResponse</code>
- <code title="delete /api/v1/commit_tags/{tag_name}">client.commitTags.<a href="./src/resources/commit-tags.ts">delete</a>(tagName) -> void</code>
- <code title="get /api/v1/commit_tags/{tag_name}">client.commitTags.<a href="./src/resources/commit-tags.ts">get</a>(tagName) -> TagInfo</code>

# Repositories

Types:

- <code><a href="./src/resources/repositories.ts">CreateRepoTagRequest</a></code>
- <code><a href="./src/resources/repositories.ts">CreateRepoTagResponse</a></code>
- <code><a href="./src/resources/repositories.ts">CreateRepositoryRequest</a></code>
- <code><a href="./src/resources/repositories.ts">CreateRepositoryResponse</a></code>
- <code><a href="./src/resources/repositories.ts">ForkRepositoryRequest</a></code>
- <code><a href="./src/resources/repositories.ts">ForkRepositoryResponse</a></code>
- <code><a href="./src/resources/repositories.ts">ListRepoTagsResponse</a></code>
- <code><a href="./src/resources/repositories.ts">ListRepositoriesResponse</a></code>
- <code><a href="./src/resources/repositories.ts">RepoTagInfo</a></code>
- <code><a href="./src/resources/repositories.ts">RepositoryInfo</a></code>
- <code><a href="./src/resources/repositories.ts">SetRepositoryVisibilityRequest</a></code>
- <code><a href="./src/resources/repositories.ts">UpdateRepoTagRequest</a></code>

Methods:

- <code title="post /api/v1/repositories">client.repositories.<a href="./src/resources/repositories.ts">create</a>({ ...params }) -> CreateRepositoryResponse</code>
- <code title="get /api/v1/repositories">client.repositories.<a href="./src/resources/repositories.ts">list</a>() -> ListRepositoriesResponse</code>
- <code title="delete /api/v1/repositories/{repo_name}">client.repositories.<a href="./src/resources/repositories.ts">delete</a>(repoName) -> void</code>
- <code title="post /api/v1/repositories/{repo_name}/tags">client.repositories.<a href="./src/resources/repositories.ts">createTag</a>(repoName, { ...params }) -> CreateRepoTagResponse</code>
- <code title="delete /api/v1/repositories/{repo_name}/tags/{tag_name}">client.repositories.<a href="./src/resources/repositories.ts">deleteTag</a>(tagName, { ...params }) -> void</code>
- <code title="post /api/v1/repositories/fork">client.repositories.<a href="./src/resources/repositories.ts">fork</a>({ ...params }) -> ForkRepositoryResponse</code>
- <code title="get /api/v1/repositories/{repo_name}">client.repositories.<a href="./src/resources/repositories.ts">get</a>(repoName) -> RepositoryInfo</code>
- <code title="get /api/v1/repositories/{repo_name}/tags/{tag_name}">client.repositories.<a href="./src/resources/repositories.ts">getTag</a>(tagName, { ...params }) -> RepoTagInfo</code>
- <code title="get /api/v1/repositories/{repo_name}/tags">client.repositories.<a href="./src/resources/repositories.ts">listTags</a>(repoName) -> ListRepoTagsResponse</code>
- <code title="patch /api/v1/repositories/{repo_name}/visibility">client.repositories.<a href="./src/resources/repositories.ts">setVisibility</a>(repoName, { ...params }) -> void</code>
- <code title="patch /api/v1/repositories/{repo_name}/tags/{tag_name}">client.repositories.<a href="./src/resources/repositories.ts">updateTag</a>(tagName, { ...params }) -> void</code>

# PublicRepositories

Types:

- <code><a href="./src/resources/public-repositories.ts">ListPublicRepositoriesResponse</a></code>
- <code><a href="./src/resources/public-repositories.ts">PublicRepositoryInfo</a></code>

Methods:

- <code title="get /api/v1/public/repositories">client.publicRepositories.<a href="./src/resources/public-repositories.ts">list</a>() -> ListPublicRepositoriesResponse</code>
- <code title="get /api/v1/public/repositories/{org_name}/{repo_name}">client.publicRepositories.<a href="./src/resources/public-repositories.ts">get</a>(repoName, { ...params }) -> PublicRepositoryInfo</code>
- <code title="get /api/v1/public/repositories/{org_name}/{repo_name}/tags/{tag_name}">client.publicRepositories.<a href="./src/resources/public-repositories.ts">getTag</a>(tagName, { ...params }) -> RepoTagInfo</code>
- <code title="get /api/v1/public/repositories/{org_name}/{repo_name}/tags">client.publicRepositories.<a href="./src/resources/public-repositories.ts">listTags</a>(repoName, { ...params }) -> ListRepoTagsResponse</code>
