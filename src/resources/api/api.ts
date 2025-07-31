// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ClusterAPI from './cluster';
import {
  Cluster,
  ClusterCreateParams,
  ClusterCreateRequest,
  ClusterCreateResponse,
  ClusterDeleteResponse,
  ClusterDto,
  ClusterGetSSHKeyResponse,
  ClusterListResponse,
  ClusterPatchRequest,
  ClusterRetrieveResponse,
  ClusterUpdateParams,
  ClusterUpdateResponse,
} from './cluster';
import * as HealthAPI from './health';
import { Health, HealthCheckResponse } from './health';
import * as RootfsAPI from './rootfs';
import {
  RootfDeleteResponse,
  RootfListResponse,
  RootfUploadParams,
  RootfUploadResponse,
  Rootfs,
  RootfsDeleteResponse,
  RootfsListResponse,
  RootfsUploadResponse,
} from './rootfs';
import * as TelemetryAPI from './telemetry';
import { Telemetry, TelemetryDto } from './telemetry';
import * as VmAPI from './vm';
import {
  Vm,
  VmBranchParams,
  VmBranchRequest,
  VmBranchResponse,
  VmCommitParams,
  VmCommitRequest,
  VmCommitResponse,
  VmDeleteParams,
  VmDeleteResponse,
  VmDto,
  VmGetSSHKeyResponse,
  VmListResponse,
  VmPatchRequest,
  VmRetrieveResponse,
  VmUpdateParams,
  VmUpdateResponse,
} from './vm';

export class API extends APIResource {
  cluster: ClusterAPI.Cluster = new ClusterAPI.Cluster(this._client);
  vm: VmAPI.Vm = new VmAPI.Vm(this._client);
  rootfs: RootfsAPI.Rootfs = new RootfsAPI.Rootfs(this._client);
  health: HealthAPI.Health = new HealthAPI.Health(this._client);
  telemetry: TelemetryAPI.Telemetry = new TelemetryAPI.Telemetry(this._client);
}

API.Cluster = Cluster;
API.Vm = Vm;
API.Rootfs = Rootfs;
API.Health = Health;
API.Telemetry = Telemetry;

export declare namespace API {
  export {
    Cluster as Cluster,
    type ClusterCreateRequest as ClusterCreateRequest,
    type ClusterDeleteResponse as ClusterDeleteResponse,
    type ClusterDto as ClusterDto,
    type ClusterPatchRequest as ClusterPatchRequest,
    type ClusterCreateResponse as ClusterCreateResponse,
    type ClusterRetrieveResponse as ClusterRetrieveResponse,
    type ClusterUpdateResponse as ClusterUpdateResponse,
    type ClusterListResponse as ClusterListResponse,
    type ClusterGetSSHKeyResponse as ClusterGetSSHKeyResponse,
    type ClusterCreateParams as ClusterCreateParams,
    type ClusterUpdateParams as ClusterUpdateParams,
  };

  export {
    Vm as Vm,
    type VmBranchRequest as VmBranchRequest,
    type VmCommitRequest as VmCommitRequest,
    type VmCommitResponse as VmCommitResponse,
    type VmDeleteResponse as VmDeleteResponse,
    type VmDto as VmDto,
    type VmPatchRequest as VmPatchRequest,
    type VmRetrieveResponse as VmRetrieveResponse,
    type VmUpdateResponse as VmUpdateResponse,
    type VmListResponse as VmListResponse,
    type VmBranchResponse as VmBranchResponse,
    type VmGetSSHKeyResponse as VmGetSSHKeyResponse,
    type VmUpdateParams as VmUpdateParams,
    type VmDeleteParams as VmDeleteParams,
    type VmBranchParams as VmBranchParams,
    type VmCommitParams as VmCommitParams,
  };

  export {
    Rootfs as Rootfs,
    type RootfsDeleteResponse as RootfsDeleteResponse,
    type RootfsListResponse as RootfsListResponse,
    type RootfsUploadResponse as RootfsUploadResponse,
    type RootfListResponse as RootfListResponse,
    type RootfDeleteResponse as RootfDeleteResponse,
    type RootfUploadResponse as RootfUploadResponse,
    type RootfUploadParams as RootfUploadParams,
  };

  export { Health as Health, type HealthCheckResponse as HealthCheckResponse };

  export { Telemetry as Telemetry, type TelemetryDto as TelemetryDto };
}
