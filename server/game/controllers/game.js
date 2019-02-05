const crypto = require('crypto');
const mongoose = require('mongoose');

const config = require('../../config');

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

  io.to(id).emit('Chat', `id ${id}`); // --------------------------------------------- DEBUG chat
  io.to(id).emit('GameChanges', store.games[id].changes.release());

  if (config.logger.game) {
    console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ start game #${id}`);// ----------------------------- DEBUG chat
  }

  return 'start game data';
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

// module.exports.action = async (ctx) => { };

module.exports.clear = async () => {
  try {
    modelGame.update(
      {
        result: null,
      },
      {
        $set: {
          result: 'error',
        },
      },
    );

    modelUser.update(
      {
        gameId: { $ne: '' },
      },
      {
        $set: {
          gameId: '',
        },
      },
      { multi: true },
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports.restore = async (ctx) => {
  const { store, userId, data } = ctx;
  const { players, games } = store;
  const gameId = data.payload;

  // восстанавливаем игру из памяти
  if (games[gameId]) {
    players[userId].socket.emit('GameChanges', [{
      event: 'startGame',
      data: {
        gameId,
        newBoard: store.games[gameId].board.getBoard(),
        players: store.games[gameId].players,
        step: store.games[gameId].step.getStep(),
      },
    }]);
    return 'game data';
  }

  // восстанавливаем результат из бд
  const game = await modelGame.findById(gameId);

  if (game && game.result) {
    players[userId].socket.emit('GameChanges', [{ event: 'endGame' }]);
    players[userId].socket.emit('Chat', `games ${game.result}`);
    return 'endGame';
  }
  players[userId].socket.emit('GameChanges', [{ event: 'endGame' }]);
  players[userId].socket.emit('Chat', 'ERROR');
  return 'ERROR';
};

module.exports.count = (ctx) => {
  const { store, userId } = ctx;
  const { players } = store;

  const result = Object.keys(store.games).length;

  players[userId].socket.emit('Chat', `games ${result}`); // ------------------------- DEBUG chat
  return result;
};
