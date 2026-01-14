# Vm

Types:

- <code><a href="./src/resources/vm.ts">ErrorResponse</a></code>
- <code><a href="./src/resources/vm.ts">NewRootRequest</a></code>
- <code><a href="./src/resources/vm.ts">NewVmResponse</a></code>
- <code><a href="./src/resources/vm.ts">Vm</a></code>
- <code><a href="./src/resources/vm.ts">VmCommitResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmDeleteResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmFromCommitRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmSSHKeyResponse</a></code>
- <code><a href="./src/resources/vm.ts">VmUpdateStateRequest</a></code>
- <code><a href="./src/resources/vm.ts">VmListResponse</a></code>

Methods:

- <code title="get /api/v1/vms">client.vm.<a href="./src/resources/vm.ts">list</a>() -> VmListResponse</code>
- <code title="delete /api/v1/vm/{vm_id}">client.vm.<a href="./src/resources/vm.ts">delete</a>(vmID, { ...params }) -> VmDeleteResponse</code>
- <code title="post /api/v1/vm/{vm_id}/commit">client.vm.<a href="./src/resources/vm.ts">commit</a>(vmID, { ...params }) -> VmCommitResponse</code>
- <code title="post /api/v1/vm/new_root">client.vm.<a href="./src/resources/vm.ts">createRoot</a>({ ...params }) -> NewVmResponse</code>
- <code title="get /api/v1/vm/{vm_id}/ssh_key">client.vm.<a href="./src/resources/vm.ts">getSSHKey</a>(vmID) -> VmSSHKeyResponse</code>
- <code title="post /api/v1/vm/from_commit">client.vm.<a href="./src/resources/vm.ts">restoreFromCommit</a>({ ...params }) -> NewVmResponse</code>
- <code title="get /api/v1/vm/{vm_id}/status">client.vm.<a href="./src/resources/vm.ts">status</a>(vmID) -> Vm</code>
- <code title="patch /api/v1/vm/{vm_id}/state">client.vm.<a href="./src/resources/vm.ts">updateState</a>(vmID, { ...params }) -> void</code>
