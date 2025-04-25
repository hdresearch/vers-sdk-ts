# API

## Cluster

Types:

- <code><a href="./src/resources/api/cluster.ts">Cluster</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterListResponse</a></code>
- <code><a href="./src/resources/api/cluster.ts">ClusterGetSSHKeyResponse</a></code>

Methods:

- <code title="post /api/cluster">client.api.cluster.<a href="./src/resources/api/cluster.ts">create</a>({ ...params }) -> Cluster</code>
- <code title="get /api/cluster/{cluster_id}">client.api.cluster.<a href="./src/resources/api/cluster.ts">retrieve</a>(clusterID) -> Cluster</code>
- <code title="get /api/cluster">client.api.cluster.<a href="./src/resources/api/cluster.ts">list</a>() -> ClusterListResponse</code>
- <code title="delete /api/cluster/{cluster_id}">client.api.cluster.<a href="./src/resources/api/cluster.ts">delete</a>(clusterID) -> Cluster</code>
- <code title="get /api/cluster/{cluster_id}/ssh_key">client.api.cluster.<a href="./src/resources/api/cluster.ts">getSSHKey</a>(clusterID) -> string</code>

## Vm

Types:

- <code><a href="./src/resources/api/vm.ts">Vm</a></code>
- <code><a href="./src/resources/api/vm.ts">VmListResponse</a></code>
- <code><a href="./src/resources/api/vm.ts">VmExecuteResponse</a></code>

Methods:

- <code title="get /api/vm/{vm_id}">client.api.vm.<a href="./src/resources/api/vm.ts">retrieve</a>(vmID) -> Vm</code>
- <code title="get /api/vm">client.api.vm.<a href="./src/resources/api/vm.ts">list</a>() -> VmListResponse</code>
- <code title="delete /api/vm/{vm_id}">client.api.vm.<a href="./src/resources/api/vm.ts">delete</a>(vmID, { ...params }) -> Vm</code>
- <code title="post /api/vm/{vm_id}/commit">client.api.vm.<a href="./src/resources/api/vm.ts">commit</a>(vmID, { ...params }) -> Vm</code>
- <code title="post /api/vm/{vm_id}/branch">client.api.vm.<a href="./src/resources/api/vm.ts">createBranch</a>(vmID, { ...params }) -> Vm</code>
- <code title="post /api/vm/{vm_id}/execute">client.api.vm.<a href="./src/resources/api/vm.ts">execute</a>(vmID, { ...params }) -> VmExecuteResponse</code>
