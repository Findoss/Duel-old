const crypto = require('crypto');
const mongoose = require('mongoose');

// models
const modelUser = require('../../models/user');
const modelGame = require('../../models/game');

// classes
const Game = require('../classes/game');

const { ObjectId } = mongoose.Types;

module.exports.start = async (ctx, pair) => {
  const { store } = ctx;
  const { io } = store;

  // console.log(socket);

  const solt = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase();

  const { id } = await modelGame.create({
    userOneId: ObjectId(pair[0].id),
    userTwoId: ObjectId(pair[1].id),
    solt,
  });

  await modelUser.update(
    {
      _id: {
        $in: [
          ObjectId(pair[0].id),
          ObjectId(pair[1].id),
        ],
      },
    },
    { $set: { gameId: id } },
    { multi: true },
  );

  store.games[id] = new Game(pair, id, solt);

  store.games[id].changes.add('startGame', {
    gameId: id,
    newBoard: store.games[id].board.generationBoard(store.games[id].seedRandom),
    players: store.games[id].players,
    step: store.games[id].step.coinToss(store.games[id].seedRandom),
  });

  pair.forEach((user) => {
    store.players[user.id].socket.join(id);
    store.players[user.id].gameId = id;
  });

  io.to(id).emit('Chat', `id ${id}`); // ------------------------------------------------ DEBUG chat
  io.to(id).emit('GameChanges', store.games[id].changes.release());
};

module.exports.surrender = async (ctx) => {
  const { store, userId } = ctx;
  const { io, games, players } = store;
  const { gameId } = players[userId];

  const pair = games[gameId].players;

  await modelGame.update(
    {
      _id: ObjectId(gameId),
    },
    {
      $push: {
        steps: {
          user: ObjectId(userId),
          action: 'surrender',
        },
      },
      $set: {
        result: `${userId} surrender`,
      },
    },
  );

  await modelUser.update(
    {
      _id: {
        $in: [
          ObjectId(pair[0].id),
          ObjectId(pair[1].id),
        ],
      },
    },
    {
      $set: {
        gameId: '',
      },
    },
    { multi: true },
  );

  io.to(gameId).emit('GameChanges', [{ event: 'endGame' }]);

  delete games[gameId];

  return 'GameChanges [endGame]';
};

// module.exports.action = (ctx) => { };

// module.exports.recovery = (ctx) => { };

module.exports.count = (ctx) => {
  const { store, userId } = ctx;
  const { players } = store;

  const result = Object.keys(store.games).length;

  players[userId].socket.emit('Chat', `games ${result}`); // ------------------------- DEBUG chat
  return result;
};
