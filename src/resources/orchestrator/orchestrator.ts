// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NodeAPI from './node';
import { Node, VmListAllResponse } from './node';
import * as VmAPI from './vm';
import {
  NewRootRequest,
  NewVmResponse,
  Vm,
  VmBranchResponse,
  VmCommitResponse,
  VmCreateRootParams,
  VmDeleteResponse,
  VmFromCommitRequest,
  VmRestoreFromCommitParams,
  VmUpdateStateParams,
  VmUpdateStateRequest,
} from './vm';

export class Orchestrator extends APIResource {
  vm: VmAPI.Vm = new VmAPI.Vm(this._client);
  node: NodeAPI.Node = new NodeAPI.Node(this._client);
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

Orchestrator.Vm = Vm;
Orchestrator.Node = Node;

export declare namespace Orchestrator {
  export { type ErrorResponse as ErrorResponse };

  export {
    Vm as Vm,
    type NewRootRequest as NewRootRequest,
    type NewVmResponse as NewVmResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmFromCommitRequest as VmFromCommitRequest,
    type VmUpdateStateRequest as VmUpdateStateRequest,
    type VmCreateRootParams as VmCreateRootParams,
    type VmRestoreFromCommitParams as VmRestoreFromCommitParams,
    type VmUpdateStateParams as VmUpdateStateParams,
  };

  export { Node as Node, type VmListAllResponse as VmListAllResponse };
}
