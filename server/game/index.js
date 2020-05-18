const Lobby = require('./classes/lobby');

const connect = require('./middleware/connect');
const disconnect = require('./middleware/disconnect');
const router = require('./routes');

const ctrlGame = require('./controllers/game');

/**
 *
 * ctx {
 *   store {    // глобальные данные игр
 *     io,
 *     lobby,
 *     games,
 *     users,
 *   },
 * },
 * userId       // текущие данные подключения
 */

module.exports = (io) => {
  ctrlGame.clear();

  const ctx = {
    store: {
      io,
      lobby: new Lobby(),
      games: {},
      users: {},
    },
  };

  io.use(async (socket, next) => {
    connect(ctx, socket).then(() => next());
  });

  io.on('connection', () => {
    router({ ...ctx });
    disconnect({ ...ctx });
  });
};
