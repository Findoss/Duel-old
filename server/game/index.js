const Lobby = require('./classes/lobby');


const connect = require('./middleware/connect');
const disconnect = require('./middleware/disconnect');
const logger = require('./middleware/logger');
const router = require('./routes');

/**
 *
 * ctx {
 *   store {    // глобальные данные игр
 *     io,
 *     lobby,
 *     games,
 *     players,
 *   },
 * },
 * userId       // текущие данные подключения
 */

module.exports = (io) => {
  const ctx = {
    store: {
      io,
      lobby: new Lobby(),
      games: {},
      players: {},
    },
  };

  io.use(async (socket, next) => {
    connect(ctx, socket).then(() => next());
  });

  io.on('connection', () => {
    logger({ ...ctx });
    router({ ...ctx });
    disconnect({ ...ctx });
  });
};
