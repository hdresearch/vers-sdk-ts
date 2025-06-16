# API

## Cluster

Types:

- <code><a href="./src/resources/api/cluster.ts">Cluster</a></code>
- <code><a href="./src/resources/api/cluster.ts">Create</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterCreateResponse</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterRetrieveResponse</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterListResponse</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterDeleteResponse</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterGetSSHKeyResponse</a></code>

Methods:

- <code title="post /api/cluster">client.api.cluster.<a href="./src/resources/api/cluster.ts">create</a>({ ...params }) -> ClusterCreateResponse</code>
- <code title="get /api/cluster/{cluster_id}">client.api.cluster.<a href="./src/resources/api/cluster.ts">retrieve</a>(clusterID) -> ClusterRetrieveResponse</code>
- <code title="get /api/cluster">client.api.cluster.<a href="./src/resources/api/cluster.ts">list</a>() -> ClusterListResponse</code>
- <code title="delete /api/cluster/{cluster_id}">client.api.cluster.<a href="./src/resources/api/cluster.ts">delete</a>(clusterID) -> ClusterDeleteResponse</code>
- <code title="get /api/cluster/{cluster_id}/ssh_key">client.api.cluster.<a href="./src/resources/api/cluster.ts">getSSHKey</a>(clusterID) -> ClusterGetSSHKeyResponse</code>

## Vm

Types:

- <code><a href="./src/resources/api/vm.ts">PatchRequest</a></code>
- <code><a href="./src/resources/api/vm.ts">Vm</a></code>
- <code><a href="./src/resources/api/vm.ts">VmRetrieveResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmListResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmDeleteResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmBranchResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmCommitResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmGetSSHKeyResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmUpdateStateResponse</a></code>

Methods:

- <code title="get /api/vm/{vm_id}">client.api.vm.<a href="./src/resources/api/vm.ts">retrieve</a>(vmID) -> VmRetrieveResponse</code>
- <code title="get /api/vm">client.api.vm.<a href="./src/resources/api/vm.ts">list</a>() -> VmListResponse</code>
- <code title="delete /api/vm/{vm_id}">client.api.vm.<a href="./src/resources/api/vm.ts">delete</a>(vmID, { ...params }) -> VmDeleteResponse</code>
- <code title="post /api/vm/{vm_id}/branch">client.api.vm.<a href="./src/resources/api/vm.ts">branch</a>(vmID) -> VmBranchResponse</code>
- <code title="post /api/vm/{vm_id}/commit">client.api.vm.<a href="./src/resources/api/vm.ts">commit</a>(vmID) -> VmCommitResponse</code>
- <code title="get /api/vm/{vm_id}/ssh_key">client.api.vm.<a href="./src/resources/api/vm.ts">getSSHKey</a>(vmID) -> VmGetSSHKeyResponse</code>
- <code title="patch /api/vm/{vm_id}">client.api.vm.<a href="./src/resources/api/vm.ts">updateState</a>(vmID, { ...params }) -> VmUpdateStateResponse</code>

## Rootfs

Types:

- <code><a href="./src/resources/api/rootfs.ts">DeleteResponse</a></code>
- <code><a href="./src/resources/api/rootfs.ts">ListResponse</a></code>
- <code><a href="./src/resources/api/rootfs.ts">UploadResponse</a></code>
- <code><a href="./src/resources/api/rootfs.ts">RootfListResponse</a></code>
- <code><a href="./src/resources/api/rootfs.ts">RootfDeleteResponse</a></code>
- <code><a href="./src/resources/api/rootfs.ts">RootfUploadResponse</a></code>

Methods:

- <code title="get /api/rootfs">client.api.rootfs.<a href="./src/resources/api/rootfs.ts">list</a>() -> RootfListResponse</code>
- <code title="delete /api/rootfs/{rootfs_id}">client.api.rootfs.<a href="./src/resources/api/rootfs.ts">delete</a>(rootfsID) -> RootfDeleteResponse</code>
- <code title="put /api/rootfs/{rootfs_id}">client.api.rootfs.<a href="./src/resources/api/rootfs.ts">upload</a>(rootfsID, { ...params }) -> RootfUploadResponse</code>

## Health

Types:

- <code><a href="./src/resources/api/health.ts">HealthCheckResponse</a></code>

Methods:

- <code title="get /api/health">client.api.health.<a href="./src/resources/api/health.ts">check</a>() -> string</code>

## Network

Types:

- <code><a href="./src/resources/api/network.ts">Info</a></code>

Methods:

- <code title="get /api/network">client.api.network.<a href="./src/resources/api/network.ts">getInfo</a>() -> Info</code>

## Telemetry
