import jackrabbit from '@pager/jackrabbit';

const host = process.env.RABBIT_URL || 'amqp://localhost';
export const queueName = process.env.QUEUE_NAME || 'tasks';

const rabbit = jackrabbit(host);
export const exchange = rabbit.default();
export const queue = exchange.queue({name: queueName, durable: true});
