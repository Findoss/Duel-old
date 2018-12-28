/**
 * io - all
 * socket - user
 * room - filter user
 */

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

const crypto = require('crypto');

const Game = require('../classes/game');

/**
 * иницаця игры
 * отправка стартовых данных
 * получение действия игрока
 */


module.exports.start = (ctx, pair) => {
  const id = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase();

  ctx.store.games[id] = new Game(pair, id);
  const game = ctx.store.games[id];

  pair.forEach((user) => {
    user.socket.join(id);
    user.socket.join(id);
  });

  game.changes.add('startGame', {
    gameId: id,
    newBoard: game.board.generationBoard(game.seedRandom),
    players: game.players,
    step: game.step.coinToss(game.seedRandom),
  });

  ctx.io.to(id).emit('GameChanges', game.changes.release());

  // const { socket, store } = ctx;
  // const { lobby } = store;


  // socket.emit('Chat', `count ${lobby.count()}`);// DEBUG chat
  // console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.count()}`);// DEBUG chat
};


module.exports.recovery = (ctx, id) => {

};
