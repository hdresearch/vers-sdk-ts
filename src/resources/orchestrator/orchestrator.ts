// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NodeAPI from './node';
import { ErrorResponse, Node, VmListAllResponse } from './node';
import * as VmAPI from './vm';
import {
  ErrorResponse as VmAPIErrorResponse,
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

Orchestrator.Vm = Vm;
Orchestrator.Node = Node;

export declare namespace Orchestrator {
  export {
    Vm as Vm,
    type VmAPIErrorResponse as ErrorResponse,
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

  export { Node as Node, type ErrorResponse as ErrorResponse, type VmListAllResponse as VmListAllResponse };
}
