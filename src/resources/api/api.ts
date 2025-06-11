// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClusterAPI from './cluster';
import {
  Cluster,
  ClusterCreateParams,
  ClusterCreateResponse,
  ClusterDeleteResponse,
  ClusterGetSSHKeyResponse,
  ClusterListResponse,
  ClusterResource,
  ClusterRetrieveResponse,
  Create,
  PatchRequest,
} from './cluster';
import * as HealthAPI from './health';
import { Health, HealthCheckResponse } from './health';
import * as NetworkAPI from './network';
import { Network } from './network';
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
  PatchRequest as VmAPIPatchRequest,
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
  VmUpdateStateParams,
  VmUpdateStateResponse,
} from './vm';

export class API extends APIResource {
  cluster: ClusterAPI.ClusterResource = new ClusterAPI.ClusterResource(this._client);
  vm: VmAPI.VmResource = new VmAPI.VmResource(this._client);
  rootfs: RootfsAPI.Rootfs = new RootfsAPI.Rootfs(this._client);
  health: HealthAPI.Health = new HealthAPI.Health(this._client);
  network: NetworkAPI.Network = new NetworkAPI.Network(this._client);
  telemetry: TelemetryAPI.Telemetry = new TelemetryAPI.Telemetry(this._client);
}

API.ClusterResource = ClusterResource;
API.VmResource = VmResource;
API.Rootfs = Rootfs;
API.Health = Health;
API.Network = Network;
API.Telemetry = Telemetry;

export declare namespace API {
  export {
    ClusterResource as ClusterResource,
    type Cluster as Cluster,
    type Create as Create,
    type PatchRequest as PatchRequest,
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterDeleteResponse as ClusterDeleteResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
  };

  export {
    VmResource as VmResource,
    type BranchRequest as BranchRequest,
    type VmAPIPatchRequest as PatchRequest,
    type Vm as Vm,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmListResponse as VmListResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmCommitResponse as VmCommitResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmUpdateStateResponse as VmUpdateStateResponse,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
    type VmUpdateStateParams as VmUpdateStateParams,
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

  export { Network as Network };

  export { Telemetry as Telemetry, type Info as Info };
}
