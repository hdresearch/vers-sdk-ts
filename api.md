# Vm

Types:

- <code><a href="./src/resources/vm.ts">ErrorResponse</a></code>
- <code><a href="./src/resources/vm.ts">NewRootRequest</a></code>
- <code><a href="./src/resources/vm.ts">Vm</a></code>
- <code><a href="./src/resources/vm.ts">VmCommitResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmDeleteResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmFromCommitRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmUpdateStateRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmListResponse</a></code>

Methods:

- <code title="get /vms">client.vm.<a href="./src/resources/vm.ts">list</a>() -> VmListResponse</code>
- <code title="delete /vm/{vm_id}">client.vm.<a href="./src/resources/vm.ts">delete</a>(vmID) -> VmDeleteResponse</code>
- <code title="post /vm/{vm_id}/branch">client.vm.<a href="./src/resources/vm.ts">branch</a>(vmID) -> void</code>
- <code title="post /vm/{vm_id}/commit">client.vm.<a href="./src/resources/vm.ts">commit</a>(vmID) -> VmCommitResponse</code>
- <code title="post /vm/new_root">client.vm.<a href="./src/resources/vm.ts">createRoot</a>({ ...params }) -> void</code>
- <code title="post /vm/from_commit">client.vm.<a href="./src/resources/vm.ts">restoreFromCommit</a>({ ...params }) -> void</code>
- <code title="patch /vm/{vm_id}/state">client.vm.<a href="./src/resources/vm.ts">updateState</a>(vmID, { ...params }) -> void</code>
