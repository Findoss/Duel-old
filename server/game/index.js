const Lobby = require('./classes/lobby');

const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const router = require('./routes');

const store = {
  lobby: new Lobby(),
  games: [],
};

/** REQ
 *
 * ctx {
 *   io,
 *   socket,
 *   store {
 *     lobby,
 *     games
 *   }
 * },
 * data {
 *   route,
 *   payload
 * }
 *
 */

module.exports = (io) => {
  io.use(async (socket, next) => auth(socket, next));

  io.on('connection', (socket) => {
    logger({ io, socket, store });
    router({ io, socket, store });
  });

  io.on('disconnect', (socket) => {
    router({ io, socket, store });
  });
};
