import {logger} from './logger';
const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

export function exitHandler(cb: Function) {
  errorTypes.forEach(type => {
    process.on(type, async err => {
      try {
        logger.info(`process.on ${type}`);
        cb(err);
      } catch (e) {
        throw e as Error;
        // process.exit(1);
      }
    });
  });

  signalTraps.forEach(type => {
    process.once(type, async () => {
      try {
        cb();
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
}
