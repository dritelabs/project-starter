import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from './protobuf/service';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = resolve(__dirname, '../proto/service.proto');
const packageDef = protoLoader.loadSync(filename, {
  arrays: true,
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const proto = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

export function createServer() {
  const server = new grpc.Server();

  return server;
}

export {ServiceNameHandlers} from './protobuf/service/ServiceName';
