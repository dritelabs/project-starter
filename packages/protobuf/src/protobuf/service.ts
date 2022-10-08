import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ServiceNameClient as _service_ServiceNameClient, ServiceNameDefinition as _service_ServiceNameDefinition } from './service/ServiceName';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  service: {
    Request: MessageTypeDefinition
    Response: MessageTypeDefinition
    ServiceName: SubtypeConstructor<typeof grpc.Client, _service_ServiceNameClient> & { service: _service_ServiceNameDefinition }
  }
}

