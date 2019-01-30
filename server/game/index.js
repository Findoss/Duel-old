const Lobby = require('./classes/lobby');

const auth = require('./middleware/auth');
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

  io.use(async (socket, next) => auth(ctx, socket, next));

  io.on('connection', () => {
    logger({ ...ctx });
    router({ ...ctx });
  });
};
