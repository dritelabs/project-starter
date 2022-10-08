// Original file: proto/service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Request as _service_Request, Request__Output as _service_Request__Output } from '../service/Request';
import type { Response as _service_Response, Response__Output as _service_Response__Output } from '../service/Response';

export interface ServiceNameClient extends grpc.Client {
  ServiceMethod(argument: _service_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  ServiceMethod(argument: _service_Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  ServiceMethod(argument: _service_Request, options: grpc.CallOptions, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  ServiceMethod(argument: _service_Request, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  serviceMethod(argument: _service_Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  serviceMethod(argument: _service_Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  serviceMethod(argument: _service_Request, options: grpc.CallOptions, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  serviceMethod(argument: _service_Request, callback: grpc.requestCallback<_service_Response__Output>): grpc.ClientUnaryCall;
  
}

export interface ServiceNameHandlers extends grpc.UntypedServiceImplementation {
  ServiceMethod: grpc.handleUnaryCall<_service_Request__Output, _service_Response>;
  
}

export interface ServiceNameDefinition extends grpc.ServiceDefinition {
  ServiceMethod: MethodDefinition<_service_Request, _service_Response, _service_Request__Output, _service_Response__Output>
}
