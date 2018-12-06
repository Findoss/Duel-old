const config = require('./config/index');

// DataBase
const mongoose = require('mongoose');
require('./models');

// API HTTP server
const app = require('./api');

// Game socket server
const socketIO = require('socket.io');
const createSocket = require('./game');


async function createApp() {
  await mongoose.connect(
    `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
    { useNewUrlParser: true },
  );

  const http = await app.listen(config.node.port);
  if (config.logger.node) console.log(`[http    ] start - ${config.node.host}:${config.node.port}`);

  const socket = createSocket(socketIO(http));
  if (config.logger.node) console.log('[socket  ] start');

  return {
    http,
    socket,
  };
}

if (!module.parent) {
  global.server = createApp();
}

module.exports = createApp;
