// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClusterAPI from './cluster';
import {
  Cluster,
  ClusterCreateParams,
  ClusterGetSSHKeyResponse,
  ClusterListResponse,
  ClusterResource,
} from './cluster';
import * as VmAPI from './vm';
import {
  Vm,
  VmCommitParams,
  VmCommitResponse,
  VmCreateBranchParams,
  VmDeleteParams,
  VmExecuteParams,
  VmExecuteResponse,
  VmListResponse,
  VmResource,
  VmUpdateParams,
} from './vm';

export class API extends APIResource {
  cluster: ClusterAPI.ClusterResource = new ClusterAPI.ClusterResource(this._client);
  vm: VmAPI.VmResource = new VmAPI.VmResource(this._client);
}

API.ClusterResource = ClusterResource;
API.VmResource = VmResource;

export declare namespace API {
  export {
    ClusterResource as ClusterResource,
    type Cluster as Cluster,
    type ClusterListResponse as ClusterListResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };

  export {
    VmResource as VmResource,
    type Vm as Vm,
    type VmListResponse as VmListResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmExecuteResponse as VmExecuteResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmCommitParams as VmCommitParams,
    type VmCreateBranchParams as VmCreateBranchParams,
    type VmExecuteParams as VmExecuteParams,
  };
}
