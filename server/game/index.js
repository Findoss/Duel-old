const Lobby = require('./classes/lobby');

const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const router = require('./routes');

/**
 *
 * ctx {
 *   store { // глобальные данные игр
 *     io,
 *     lobby,
 *     games,
 *   },
 *   state { // текущие данные подключения
 *     userId,
 *     gameId,
 *     access,
 *     nickname,
 *   },
 *   socket,
 * },
 * data { // текущие данные запроса
 *   route,
 *   payload,
 * }
 *
 */

// INIT
const lobby = new Lobby();
const games = [];

module.exports = (io) => {
  //
  const ctx = {
    store: {
      io,
      lobby,
      games,
    },
    state: {
      userId: null,
      gameId: null,
      access: [0],
      nickname: null,
    },
  };

  io.use(async (socket, next) => auth(socket, ctx, next));

  io.on('connection', (socket) => {
    logger({ ...ctx, socket });
    router({ ...ctx, socket });
  });

  io.on('disconnect', (socket) => {
    router({ ...ctx, socket });
  });
};
