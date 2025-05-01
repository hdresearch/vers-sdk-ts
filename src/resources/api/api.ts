// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClusterAPI from './cluster';
import {
  Cluster,
  ClusterCreateParams,
  ClusterGetSSHKeyResponse,
  ClusterListResponse,
  ClusterResource,
  Create,
} from './cluster';
import * as HealthAPI from './health';
import { Health, HealthCheckResponse } from './health';
import * as NetworkAPI from './network';
import { Info, Network } from './network';
import * as RootfsAPI from './rootfs';
import { DeleteResponse, ListResponse, RootfUploadParams, Rootfs, UploadResponse } from './rootfs';
import * as VmAPI from './vm';
import {
  ExecuteCommand,
  ExecuteResponse,
  PatchRequest,
  Vm,
  VmDeleteParams,
  VmExecuteParams,
  VmGetSSHKeyResponse,
  VmListResponse,
  VmResource,
  VmUpdateStateParams,
} from './vm';

export class API extends APIResource {
  cluster: ClusterAPI.ClusterResource = new ClusterAPI.ClusterResource(this._client);
  vm: VmAPI.VmResource = new VmAPI.VmResource(this._client);
  rootfs: RootfsAPI.Rootfs = new RootfsAPI.Rootfs(this._client);
  health: HealthAPI.Health = new HealthAPI.Health(this._client);
  network: NetworkAPI.Network = new NetworkAPI.Network(this._client);
}

API.ClusterResource = ClusterResource;
API.VmResource = VmResource;
API.Rootfs = Rootfs;
API.Health = Health;
API.Network = Network;

export declare namespace API {
  export {
    ClusterResource as ClusterResource,
    type Cluster as Cluster,
    type Create as Create,
    type ClusterListResponse as ClusterListResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };

  export {
    VmResource as VmResource,
    type ExecuteCommand as ExecuteCommand,
    type ExecuteResponse as ExecuteResponse,
    type PatchRequest as PatchRequest,
    type Vm as Vm,
    type VmListResponse as VmListResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmExecuteParams as VmExecuteParams,
    type VmUpdateStateParams as VmUpdateStateParams,
  };

  export {
    Rootfs as Rootfs,
    type DeleteResponse as DeleteResponse,
    type ListResponse as ListResponse,
    type UploadResponse as UploadResponse,
    type RootfUploadParams as RootfUploadParams,
  };

  export { Health as Health, type HealthCheckResponse as HealthCheckResponse };

  export { Network as Network, type Info as Info };
}
