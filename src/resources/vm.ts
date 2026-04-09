// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class VmResource extends APIResource {
  list(options?: RequestOptions): APIPromise<VmListResponse> {
    return this._client.get('/api/v1/vms', options);
  }

  delete(
    vmID: string,
    params: VmDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VmDeleteResponse> {
    const { skip_wait_boot } = params ?? {};
    return this._client.delete(path`/api/v1/vm/${vmID}`, { query: { skip_wait_boot }, ...options });
  }

  branch(
    vmOrCommitID: string,
    params: VmBranchParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count, keep_paused, skip_wait_boot } = params ?? {};
    return this._client.post(path`/api/v1/vm/${vmOrCommitID}/branch`, {
      query: { count, keep_paused, skip_wait_boot },
      ...options,
    });
  }

  branchByCommit(
    commitID: string,
    params: VmBranchByCommitParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count } = params ?? {};
    return this._client.post(path`/api/v1/vm/branch/by_commit/${commitID}`, { query: { count }, ...options });
  }

  branchByTag(
    tagName: string,
    params: VmBranchByTagParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count } = params ?? {};
    return this._client.post(path`/api/v1/vm/branch/by_tag/${tagName}`, { query: { count }, ...options });
  }

  branchByVm(
    vmID: string,
    params: VmBranchByVmParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NewVmsResponse> {
    const { count, keep_paused, skip_wait_boot } = params ?? {};
    return this._client.post(path`/api/v1/vm/branch/by_vm/${vmID}`, {
      query: { count, keep_paused, skip_wait_boot },
      ...options,
    });
  }

  commit(vmID: string, params: VmCommitParams, options?: RequestOptions): APIPromise<VmCommitResponse> {
    const { keep_paused, skip_wait_boot, ...body } = params;
    return this._client.post(path`/api/v1/vm/${vmID}/commit`, {
      query: { keep_paused, skip_wait_boot },
      body,
      ...options,
    });
  }

  createRoot(params: VmCreateRootParams, options?: RequestOptions): APIPromise<NewVmResponse> {
    const { wait_boot, ...body } = params;
    return this._client.post('/api/v1/vm/new_root', { query: { wait_boot }, body, ...options });
  }

  exec(vmID: string, body: VmExecParams, options?: RequestOptions): APIPromise<VmExecResponse> {
    return this._client.post(path`/api/v1/vm/${vmID}/exec`, { body, ...options });
  }

  execStream(vmID: string, body: VmExecStreamParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/api/v1/vm/${vmID}/exec/stream`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  execStreamAttach(vmID: string, body: VmExecStreamAttachParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/api/v1/vm/${vmID}/exec/stream/attach`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  getLogs(
    vmID: string,
    query: VmGetLogsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VmExecLogResponse> {
    return this._client.get(path`/api/v1/vm/${vmID}/logs`, { query, ...options });
  }

  getMetadata(vmID: string, options?: RequestOptions): APIPromise<VmMetadataResponse> {
    return this._client.get(path`/api/v1/vm/${vmID}/metadata`, options);
  }

  getSSHKey(vmID: string, options?: RequestOptions): APIPromise<VmSSHKeyResponse> {
    return this._client.get(path`/api/v1/vm/${vmID}/ssh_key`, options);
  }

  resizeDisk(vmID: string, params: VmResizeDiskParams, options?: RequestOptions): APIPromise<void> {
    const { skip_wait_boot, ...body } = params;
    return this._client.patch(path`/api/v1/vm/${vmID}/disk`, {
      query: { skip_wait_boot },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  restoreFromCommit(body: VmRestoreFromCommitParams, options?: RequestOptions): APIPromise<NewVmResponse> {
    return this._client.post('/api/v1/vm/from_commit', { body, ...options });
  }

  status(vmID: string, options?: RequestOptions): APIPromise<Vm> {
    return this._client.get(path`/api/v1/vm/${vmID}/status`, options);
  }

  updateState(vmID: string, params: VmUpdateStateParams, options?: RequestOptions): APIPromise<void> {
    const { skip_wait_boot, ...body } = params;
    return this._client.patch(path`/api/v1/vm/${vmID}/state`, {
      query: { skip_wait_boot },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ErrorResponse {
  /**
   * Reason of error
   */
  error?: string;

  /**
   * Is always: false
   */
  success?: boolean;
}

export interface NewRootRequest {
  /**
   * Struct representing configuration options common to all VMs
   */
  vm_config: NewRootRequest.VmConfig;
}

export namespace NewRootRequest {
  /**
   * Struct representing configuration options common to all VMs
   */
  export interface VmConfig {
    /**
     * The disk size, in MiB.
     */
    fs_size_mib?: number | null;

    /**
     * The filesystem base image name. Currently, must be 'default'
     */
    image_name?: string | null;

    /**
     * The kernel name. Currently, must be 'default.bin'
     */
    kernel_name?: string | null;

    labels?: { [key: string]: string } | null;

    /**
     * The RAM size, in MiB.
     */
    mem_size_mib?: number | null;

    /**
     * How many vCPUs to allocate to this VM (and its children)
     */
    vcpu_count?: number | null;
  }
}

/**
 * Response body for new VM requests (new_root, from_commit, branch)
 */
export interface NewVmResponse {
  vm_id: string;
}

export interface NewVmsResponse {
  vms: Array<NewVmResponse>;
}

export interface Vm {
  created_at: string;

  owner_id: string;

  /**
   * The state of a VM
   */
  state: 'booting' | 'running' | 'paused' | 'sleeping' | 'dead';

  vm_id: string;

  labels?: { [key: string]: string } | null;
}

/**
 * The response body for POST /api/vm/{vm_id}/commit
 */
export interface VmCommitResponse {
  /**
   * The UUID of the newly-created commit
   */
  commit_id: string;
}

/**
 * Response body for DELETE /api/vm/{vm_id}
 */
export interface VmDeleteResponse {
  vm_id: string;
}

/**
 * Query params for GET /api/vm/{vm_id}/exec/logs
 */
export interface VmExecLogQuery {
  /**
   * Maximum number of entries to return (server applies caps).
   */
  max_entries?: number | null;

  /**
   * Byte offset into the log file to start reading from.
   */
  offset?: number | null;

  /**
   * Skip waiting for boot state (mirrors exec).
   */
  skip_wait_boot?: boolean | null;

  /**
   * Filter by stream (stdout/stderr). Default: all streams.
   */
  stream?: 'stdout' | 'stderr' | null;
}

/**
 * Response for exec log tail requests.
 */
export interface VmExecLogResponse {
  /**
   * Returned log entries.
   */
  entries: Array<VmExecLogResponse.Entry>;

  /**
   * True when the end of file was reached.
   */
  eof: boolean;

  /**
   * Next byte offset to continue from.
   */
  next_offset: number;
}

export namespace VmExecLogResponse {
  /**
   * Individual log entry describing emitted stdout/stderr chunk.
   */
  export interface Entry {
    /**
     * Base64-encoded bytes from stdout/stderr chunk.
     */
    data_b64: string;

    /**
     * Streams available for exec logging.
     */
    stream: 'stdout' | 'stderr';

    timestamp: string;

    exec_id?: string | null;
  }
}

/**
 * Request body for POST /api/vm/{vm_id}/exec
 */
export interface VmExecRequest {
  /**
   * Command and arguments to execute.
   */
  command: Array<string>;

  /**
   * Optional environment variables to set for the process.
   */
  env?: { [key: string]: string } | null;

  /**
   * Optional exec identifier for tracking.
   */
  exec_id?: string | null;

  /**
   * Optional stdin payload passed to the command.
   */
  stdin?: string | null;

  /**
   * Timeout in seconds (0 = no timeout).
   */
  timeout_secs?: number | null;

  /**
   * Optional working directory for the command.
   */
  working_dir?: string | null;
}

/**
 * Response body for POST /api/vm/{vm_id}/exec
 */
export interface VmExecResponse {
  /**
   * Exit code returned by the command.
   */
  exit_code: number;

  /**
   * UTF-8 decoded stderr (lossy).
   */
  stderr: string;

  /**
   * UTF-8 decoded stdout (lossy).
   */
  stdout: string;

  /**
   * Exec identifier associated with this run.
   */
  exec_id?: string | null;
}

/**
 * Request body for POST /api/vm/{vm_id}/exec/stream/attach
 */
export interface VmExecStreamAttachRequest {
  /**
   * Identifier of the exec stream session to reattach to.
   */
  exec_id: string;

  /**
   * Optional cursor to resume from (exclusive). If omitted, the full retained
   * backlog is replayed.
   */
  cursor?: number | null;

  /**
   * Start streaming after the latest retained chunk (ignores cursor).
   */
  from_latest?: boolean | null;
}

/**
 * Request body for POST /api/v1/vm/from_commit
 */
export type VmFromCommitRequest =
  | VmFromCommitRequest.CommitID
  | VmFromCommitRequest.TagName
  | VmFromCommitRequest.Ref;

export namespace VmFromCommitRequest {
  /**
   * The commit ID to restore from
   */
  export interface CommitID {
    /**
     * The commit ID to restore from
     */
    commit_id: string;
  }

  /**
   * The tag name to restore from (legacy org-scoped tag)
   */
  export interface TagName {
    /**
     * The tag name to restore from (legacy org-scoped tag)
     */
    tag_name: string;
  }

  /**
   * A repository reference in "repo_name:tag_name" format
   */
  export interface Ref {
    /**
     * A repository reference in "repo_name:tag_name" format
     */
    ref: string;
  }
}

/**
 * Response for GET /api/v1/vm/{vm_id}/metadata
 */
export interface VmMetadataResponse {
  created_at: string;

  ip: string;

  owner_id: string;

  /**
   * The state of a VM
   */
  state: 'booting' | 'running' | 'paused' | 'sleeping' | 'dead';

  vm_id: string;

  deleted_at?: string | null;

  grandparent_vm_id?: string | null;

  parent_commit_id?: string | null;
}

/**
 * Request body for PATCH /api/vm/{vm_id}/disk
 */
export interface VmResizeDiskRequest {
  /**
   * The new disk size in MiB. Must be strictly greater than the current size.
   */
  fs_size_mib: number;
}

/**
 * Response body for GET /api/vm/{vm_id}/ssh_key
 */
export interface VmSSHKeyResponse {
  /**
   * The SSH port that will be DNAT'd to the VM's netns (and, in turn, to its TAP
   * device)
   */
  ssh_port: number;

  /**
   * Private SSH key in stringified OpenSSH format
   */
  ssh_private_key: string;
}

/**
 * Request body for PATCH /api/vm/{vm_id}/state
 */
export interface VmUpdateStateRequest {
  /**
   * The requested state for the VM
   */
  state: 'Paused' | 'Running';
}

export type VmListResponse = Array<Vm>;

export interface VmDeleteParams {
  /**
   * If true, return an error immediately if the VM is still booting. Default: false
   */
  skip_wait_boot?: boolean;
}

export interface VmBranchParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;

  /**
   * If true, keep VM paused after commit. Only applicable when branching a VM ID.
   */
  keep_paused?: boolean;

  /**
   * If true, immediately return an error if VM is booting instead of waiting. Only
   * applicable when branching a VM ID.
   */
  skip_wait_boot?: boolean;
}

export interface VmBranchByCommitParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;
}

export interface VmBranchByTagParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;
}

export interface VmBranchByVmParams {
  /**
   * Number of VMs to branch (optional; default 1)
   */
  count?: number;

  /**
   * If true, keep VM paused after commit
   */
  keep_paused?: boolean;

  /**
   * If true, immediately return an error if VM is booting instead of waiting
   */
  skip_wait_boot?: boolean;
}

export interface VmCommitParams {
  /**
   * Query param: If true, keep VM paused after commit
   */
  keep_paused?: boolean;

  /**
   * Query param: If true, return an error immediately if the VM is still booting.
   * Default: false
   */
  skip_wait_boot?: boolean;

  /**
   * Body param: If provided, chelsea will use the requested commit UUID. Otherwise,
   * it will generate a UUID itself.
   */
  commit_id?: string | null;

  /**
   * Body param: Optional description for the commit.
   */
  description?: string | null;

  /**
   * Body param: Optional human-readable name for the commit. Defaults to
   * auto-generated name if not provided.
   */
  name?: string | null;
}

export interface VmCreateRootParams {
  /**
   * Body param: Struct representing configuration options common to all VMs
   */
  vm_config: VmCreateRootParams.VmConfig;

  /**
   * Query param: If true, wait for the newly-created VM to finish booting before
   * returning. Default: false.
   */
  wait_boot?: boolean;
}

export namespace VmCreateRootParams {
  /**
   * Struct representing configuration options common to all VMs
   */
  export interface VmConfig {
    /**
     * The disk size, in MiB.
     */
    fs_size_mib?: number | null;

    /**
     * The filesystem base image name. Currently, must be 'default'
     */
    image_name?: string | null;

    /**
     * The kernel name. Currently, must be 'default.bin'
     */
    kernel_name?: string | null;

    labels?: { [key: string]: string } | null;

    /**
     * The RAM size, in MiB.
     */
    mem_size_mib?: number | null;

    /**
     * How many vCPUs to allocate to this VM (and its children)
     */
    vcpu_count?: number | null;
  }
}

export interface VmExecParams {
  /**
   * Command and arguments to execute.
   */
  command: Array<string>;

  /**
   * Optional environment variables to set for the process.
   */
  env?: { [key: string]: string } | null;

  /**
   * Optional exec identifier for tracking.
   */
  exec_id?: string | null;

  /**
   * Optional stdin payload passed to the command.
   */
  stdin?: string | null;

  /**
   * Timeout in seconds (0 = no timeout).
   */
  timeout_secs?: number | null;

  /**
   * Optional working directory for the command.
   */
  working_dir?: string | null;
}

export interface VmExecStreamParams {
  /**
   * Command and arguments to execute.
   */
  command: Array<string>;

  /**
   * Optional environment variables to set for the process.
   */
  env?: { [key: string]: string } | null;

  /**
   * Optional exec identifier for tracking.
   */
  exec_id?: string | null;

  /**
   * Optional stdin payload passed to the command.
   */
  stdin?: string | null;

  /**
   * Timeout in seconds (0 = no timeout).
   */
  timeout_secs?: number | null;

  /**
   * Optional working directory for the command.
   */
  working_dir?: string | null;
}

export interface VmExecStreamAttachParams {
  /**
   * Identifier of the exec stream session to reattach to.
   */
  exec_id: string;

  /**
   * Optional cursor to resume from (exclusive). If omitted, the full retained
   * backlog is replayed.
   */
  cursor?: number | null;

  /**
   * Start streaming after the latest retained chunk (ignores cursor).
   */
  from_latest?: boolean | null;
}

export interface VmGetLogsParams {
  /**
   * Maximum number of log entries to return
   */
  max_entries?: number;

  /**
   * Byte offset into the log file (default: 0)
   */
  offset?: number;

  /**
   * Filter by 'stdout' or 'stderr'
   */
  stream?: string;
}

export interface VmResizeDiskParams {
  /**
   * Body param: The new disk size in MiB. Must be strictly greater than the current
   * size.
   */
  fs_size_mib: number;

  /**
   * Query param: If true, return an error immediately if the VM is still booting.
   * Default: false
   */
  skip_wait_boot?: boolean;
}

export type VmRestoreFromCommitParams =
  | VmRestoreFromCommitParams.Variant0
  | VmRestoreFromCommitParams.Variant1
  | VmRestoreFromCommitParams.Variant2;

export declare namespace VmRestoreFromCommitParams {
  export interface Variant0 {
    /**
     * The commit ID to restore from
     */
    commit_id: string;
  }

  export interface Variant1 {
    /**
     * The tag name to restore from (legacy org-scoped tag)
     */
    tag_name: string;
  }

  export interface Variant2 {
    /**
     * A repository reference in "repo_name:tag_name" format
     */
    ref: string;
  }
}

export interface VmUpdateStateParams {
  /**
   * Body param: The requested state for the VM
   */
  state: 'Paused' | 'Running';

  /**
   * Query param: If true, error immediately if the VM is not finished booting.
   * Defaults to false
   */
  skip_wait_boot?: boolean;
}

export declare namespace VmResource {
  export {
    type ErrorResponse as ErrorResponse,
    type NewRootRequest as NewRootRequest,
    type NewVmResponse as NewVmResponse,
    type NewVmsResponse as NewVmsResponse,
    type Vm as Vm,
    type VmCommitResponse as VmCommitResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmExecLogQuery as VmExecLogQuery,
    type VmExecLogResponse as VmExecLogResponse,
    type VmExecRequest as VmExecRequest,
    type VmExecResponse as VmExecResponse,
    type VmExecStreamAttachRequest as VmExecStreamAttachRequest,
    type VmFromCommitRequest as VmFromCommitRequest,
    type VmMetadataResponse as VmMetadataResponse,
    type VmResizeDiskRequest as VmResizeDiskRequest,
    type VmSSHKeyResponse as VmSSHKeyResponse,
    type VmUpdateStateRequest as VmUpdateStateRequest,
    type VmListResponse as VmListResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
    type VmBranchByCommitParams as VmBranchByCommitParams,
    type VmBranchByTagParams as VmBranchByTagParams,
    type VmBranchByVmParams as VmBranchByVmParams,
    type VmCommitParams as VmCommitParams,
    type VmCreateRootParams as VmCreateRootParams,
    type VmExecParams as VmExecParams,
    type VmExecStreamParams as VmExecStreamParams,
    type VmExecStreamAttachParams as VmExecStreamAttachParams,
    type VmGetLogsParams as VmGetLogsParams,
    type VmResizeDiskParams as VmResizeDiskParams,
    type VmRestoreFromCommitParams as VmRestoreFromCommitParams,
    type VmUpdateStateParams as VmUpdateStateParams,
  };
}
