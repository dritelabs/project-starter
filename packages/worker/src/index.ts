import jackrabbit from '@pager/jackrabbit';
import {exitHandler, logger} from '@dritelabs/project-starter-utils';

const host = process.env.RABBIT_URL || 'amqp://localhost';
const queueName = process.env.QUEUE_NAME || 'tasks';

const rabbit = jackrabbit(host);
const exchange = rabbit.default();
const queue = exchange.queue({name: queueName, durable: true});

queue.consume(async (data, ack, nack) => {
  try {
    logger.info('Doing something');

    ack();
  } catch (error) {
    logger.info('Error Doing something');
    logger.error(error);
    nack();
  }
});

exitHandler(() => {
  rabbit.close(() => process.exit(0));
});
