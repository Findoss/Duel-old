/* eslint no-console: 0 */
/* правило консоли выключено потому что
 * это важыный элемент логов, управляется через переменную окружения
 */

const config = require('../config');
const mongoose = require('mongoose');

mongoose.set('debug', config.db.debug);

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    if (config.logger.node) console.log(`[database] disconnected through ${msg}`);
    callback();
  });
};

mongoose.connection.on('connected', () => {
  if (config.logger.node) console.log(`[database] connected - ${config.db.host}:${config.db.port}`);
  if (config.logger.node) console.log(`[database] use ${config.db.name}`);
});

mongoose.connection.on('error', (error) => {
  if (config.logger.node) console.log(`[database] connection error: ${error}`);
});

mongoose.connection.on('disconnected', () => {
  if (config.logger.node) console.log('[database] disconnected');
});

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown', () => {
    process.exit(0);
  });
});
