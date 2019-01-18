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
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const User = require('../../models/user');

const Game = require('../classes/game');

/**
 * иницаця игры
 * отправка стартовых данных
 * получение действия игрока
 */


module.exports.start = async (ctx, pair) => {
  const { store } = ctx;
  const { io } = store;

  const id = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase();

  store.games[id] = new Game(pair, id);


  store.games[id].changes.add('startGame', {
    gameId: id,
    newBoard: store.games[id].board.generationBoard(store.games[id].seedRandom),
    players: store.games[id].players,
    step: store.games[id].step.coinToss(store.games[id].seedRandom),
  });

  await User.update(
    {
      _id: {
        $in: [
          ObjectId(pair[0].id),
          ObjectId(pair[1].id),
        ],
      },
    },
    {
      $set: { status: id },
    },
    {
      multi: true,
    },
  );

  pair.forEach((user) => {
    user.socket.join(id);
    user.socket.join(id);
  });

  io.to(id).emit('GameChanges', store.games[id].changes.release());
};

module.exports.surrender = (ctx) => {
  const { state, store } = ctx;
  const { gameId } = state;

  store.io.to(gameId).emit('GameChanges', ['endGame']);

  delete store.games[gameId];

  console.log('               │');// DEBUG chat
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ end game (surrender player)');// DEBUG chat
};

module.exports.action = (ctx) => { };

module.exports.recovery = (ctx) => { };

module.exports.count = (ctx) => {
  const { state, store, socket } = ctx;

  socket.emit('Chat', `games ${Object.keys(store.games).length}`);

  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${Object.keys(store.games).length}`);// DEBUG chat
};
