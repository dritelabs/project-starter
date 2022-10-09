import {grpc} from '@dritelabs/project-starter-protobuf';
import {
  createServer,
  proto,
} from '@dritelabs/project-starter-protobuf/dist/server';
import {exitHandler, logger} from '@dritelabs/project-starter-utils';
import {config} from './config';
import * as implementations from './implementations';

const server = createServer();

server.addService(proto.service.ServiceName.service, implementations);

server.bindAsync(config.host, grpc.ServerCredentials.createInsecure(), () => {
  logger.info(`Server listening on port ${config.host}`);
});

exitHandler((err: Error) => {
  console.log(err);
  process.exit(0);
});
