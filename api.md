# Orchestrator

Types:

- <code><a href="./src/resources/orchestrator/orchestrator.ts">ErrorResponse</a></code>

## Vm

Types:

- <code><a href="./src/resources/orchestrator/vm.ts">NewRootRequest</a></code>
- <code><a href="./src/resources/orchestrator/vm.ts">NewVmResponse</a></code>
- <code><a href="./src/resources/orchestrator/vm.ts">VmBranchResponse</a></code>
- <code><a href="./src/resources/orchestrator/vm.ts">VmCommitResponse</a></code>
- <code><a href="./src/resources/orchestrator/vm.ts">VmDeleteResponse</a></code>
- <code><a href="./src/resources/orchestrator/vm.ts">VmFromCommitRequest</a></code>
- <code><a href="./src/resources/orchestrator/vm.ts">VmUpdateStateRequest</a></code>

Methods:

- <code title="delete /vm/{vm_id}">client.orchestrator.vm.<a href="./src/resources/orchestrator/vm.ts">delete</a>(vmID) -> VmDeleteResponse</code>
- <code title="post /vm/{vm_id}/branch">client.orchestrator.vm.<a href="./src/resources/orchestrator/vm.ts">branch</a>(vmID) -> NewVmResponse</code>
- <code title="post /vm/{vm_id}/commit">client.orchestrator.vm.<a href="./src/resources/orchestrator/vm.ts">commit</a>(vmID) -> VmCommitResponse</code>
- <code title="post /vm/new_root">client.orchestrator.vm.<a href="./src/resources/orchestrator/vm.ts">createRoot</a>({ ...params }) -> NewVmResponse</code>
- <code title="post /vm/from_commit">client.orchestrator.vm.<a href="./src/resources/orchestrator/vm.ts">restoreFromCommit</a>({ ...params }) -> NewVmResponse</code>
- <code title="patch /vm/{vm_id}/state">client.orchestrator.vm.<a href="./src/resources/orchestrator/vm.ts">updateState</a>(vmID, { ...params }) -> void</code>

## Node

Types:

- <code><a href="./src/resources/orchestrator/node.ts">VmListAllResponse</a></code>

Methods:

- <code title="get /node/{node_id}/vms">client.orchestrator.node.<a href="./src/resources/orchestrator/node.ts">listVms</a>(nodeID) -> VmListAllResponse</code>
