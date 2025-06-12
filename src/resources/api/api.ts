// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClusterAPI from './cluster';
import {
  Cluster,
  ClusterCreateParams,
  ClusterCreateResponse,
  ClusterGetSSHKeyResponse,
  ClusterListResponse,
  ClusterResource,
  ClusterRetrieveResponse,
  ClusterUpdateParams,
  ClusterUpdateResponse,
  Create,
  UpdateCluster,
} from './cluster';
import * as HealthAPI from './health';
import { Health, HealthCheckResponse } from './health';
import * as RootfsAPI from './rootfs';
import {
  DeleteResponse,
  ListResponse,
  RootfDeleteResponse,
  RootfListResponse,
  RootfUploadParams,
  RootfUploadResponse,
  Rootfs,
  UploadResponse,
} from './rootfs';
import * as TelemetryAPI from './telemetry';
import { Info, Telemetry } from './telemetry';
import * as VmAPI from './vm';
import {
  BranchRequest,
  UpdateVm,
  Vm,
  VmBranchParams,
  VmBranchResponse,
  VmCommitResponse,
  VmDeleteParams,
  VmDeleteResponse,
  VmGetSSHKeyResponse,
  VmListResponse,
  VmResource,
  VmRetrieveResponse,
  VmUpdateParams,
  VmUpdateResponse,
} from './vm';

export class API extends APIResource {
  cluster: ClusterAPI.ClusterResource = new ClusterAPI.ClusterResource(this._client);
  vm: VmAPI.VmResource = new VmAPI.VmResource(this._client);
  rootfs: RootfsAPI.Rootfs = new RootfsAPI.Rootfs(this._client);
  health: HealthAPI.Health = new HealthAPI.Health(this._client);
  telemetry: TelemetryAPI.Telemetry = new TelemetryAPI.Telemetry(this._client);
}

API.ClusterResource = ClusterResource;
API.VmResource = VmResource;
API.Rootfs = Rootfs;
API.Health = Health;
API.Telemetry = Telemetry;

export declare namespace API {
  export {
    ClusterResource as ClusterResource,
    type Cluster as Cluster,
    type Create as Create,
    type UpdateCluster as UpdateCluster,
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterUpdateResponse as ClusterUpdateResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
    type ClusterUpdateParams as ClusterUpdateParams,
  };

  export {
    VmResource as VmResource,
    type BranchRequest as BranchRequest,
    type UpdateVm as UpdateVm,
    type Vm as Vm,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmUpdateResponse as VmUpdateResponse,
    type VmListResponse as VmListResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
  };

  export {
    Rootfs as Rootfs,
    type DeleteResponse as DeleteResponse,
    type ListResponse as ListResponse,
    type UploadResponse as UploadResponse,
    type RootfListResponse as RootfListResponse,
    type RootfDeleteResponse as RootfDeleteResponse,
    type RootfUploadResponse as RootfUploadResponse,
    type RootfUploadParams as RootfUploadParams,
  };

  export { Health as Health, type HealthCheckResponse as HealthCheckResponse };

  export { Telemetry as Telemetry, type Info as Info };
}
