import {grpc} from '@dritelabs/project-starter-protobuf';
import {ServiceNameHandlers} from '@dritelabs/project-starter-protobuf/dist/protobuf/service/ServiceName';

export const transcode: ServiceNameHandlers['SayHello'] = async (
  call,
  callback
) => {
  try {
    callback(null, {});
  } catch (e) {
    const error = e as Error;
    callback({
      ...error,
      code: grpc.status.UNKNOWN,
    });
  }
};
