// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClusterAPI from './cluster';
import {
  Cluster,
  ClusterCreateParams,
  ClusterCreateResponse,
  ClusterDeleteResponse,
  ClusterListResponse,
  ClusterRetrieveResponse,
} from './cluster';
import * as VmAPI from './vm';
import {
  Vm,
  VmCreateBranchParams,
  VmCreateBranchResponse,
  VmDeleteParams,
  VmExecuteParams,
  VmExecuteResponse,
  VmListResponse,
  VmRetrieveResponse,
  VmUpdateParams,
  VmUpdateResponse,
} from './vm';

export class API extends APIResource {
  cluster: ClusterAPI.Cluster = new ClusterAPI.Cluster(this._client);
  vm: VmAPI.Vm = new VmAPI.Vm(this._client);
}

API.Cluster = Cluster;
API.Vm = Vm;

export declare namespace API {
  export {
    Cluster as Cluster,
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterDeleteResponse as ClusterDeleteResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };

  export {
    Vm as Vm,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmUpdateResponse as VmUpdateResponse,
    type VmListResponse as VmListResponse,
    type VmCreateBranchResponse as VmCreateBranchResponse,
    type VmExecuteResponse as VmExecuteResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmCreateBranchParams as VmCreateBranchParams,
    type VmExecuteParams as VmExecuteParams,
  };
}
