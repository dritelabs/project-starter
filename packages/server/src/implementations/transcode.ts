import {grpc} from '@dritelabs/project-starter-protobuf';
import {ServiceNameHandlers} from '@dritelabs/project-starter-protobuf/dist/protobuf/service/ServiceName';
import {exchange, queueName} from '../jackrabbit';

export const transcode: ServiceNameHandlers['Transcode'] = async (
  call,
  callback
) => {
  try {
    exchange.publish(
      {},
      {
        key: queueName,
      }
    );

    callback(null, {});
  } catch (e) {
    const error = e as Error;
    callback({
      ...error,
      code: grpc.status.UNKNOWN,
    });
  }
};
