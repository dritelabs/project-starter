import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from './protobuf/service';

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultHost = process.env.SERVER_HOST || 'localhost:5000';
const filename = resolve(__dirname, '../proto/service.proto');
const packageDef = protoLoader.loadSync(filename, {
  arrays: true,
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

export function createClient(host: string = defaultHost) {
  const client = new proto.service.ServiceName(
    host,
    grpc.credentials.createInsecure()
  );

  return client;
}
