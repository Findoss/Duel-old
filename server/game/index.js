const Lobby = require('./classes/lobby');

const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const router = require('./routes');

const state = {
  lobby: new Lobby(),
};

module.exports = (io) => {
  io.use(async (socket, next) => auth(socket, next));

  io.on('connection', (socket) => {
    logger({ io, socket, state });
    router({ io, socket, state });
  });
};
