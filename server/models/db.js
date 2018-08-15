const config = {
  ...require('../config/default.json'),
  ...require('../config/production.json'),
};

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.set('debug', config.db.debug);


const gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
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
