const crypto = require('crypto');
const mongoose = require('mongoose');
const debug = require('../../utils/debug');

const configGame = require('../../static/game.json');

// models
const modelUser = require('../../models/user');
const modelGame = require('../../models/game');

// classes
const Game = require('../classes/game');
const Timer = require('../classes/timer');

const { ObjectId } = mongoose.Types;

/**
 * Запуск игры
 */
module.exports.start = async (ctx, pair) => {
  const { store } = ctx;
  const { io } = store;

  // генерируем строку для псевдорандома
  const solt = crypto
    .randomBytes(40)
    .toString('hex')
    .toUpperCase();

  // создаем докеумент игры в бд
  const { id } = await modelGame.create({
    users: [
      ObjectId(pair[0].id),
      ObjectId(pair[1].id),
    ],
    solt,
  });

  // обновляем статус пользователя
  // указываем в какой игре пользователь находиться
  modelUser.update(
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

  // инициализируем игру
  store.games[id] = new Game(pair, id, solt);
  const game = store.games[id];

  // создаем список изменений в игре
  game.changes.add('startGame', {
    gameId: id,
    newBoard: game.board.generationBoard(game.seedRandom),
    users: game.users,
    step: game.step.coinToss(game.seedRandom),
  });

  // подключаем сокеты пользователей к игровому сокету
  pair.forEach((user) => {
    store.users[user.id].socket.join(id);
    store.users[user.id].gameId = id;
  });

  // фиксируем количество игровых событий
  game.changes.fixEventNumber();

  // инициализируем таймер для обработки лимитов на ход по времени
  // дескриптор указан в поле timer
  game.timer = new Timer(this.checkTimeStep, configGame.timeStep, ctx);
  game.timer.start();

  // отправляем изменения игры
  io.to(id).emit('GameChanges', game.changes.release());

  debug.chat(io.to(id), `id ${id}`);
  debug.log('               └───┐');
  debug.log(`                   │ gameId: ${id}`);
  debug.log('                   │ start game');
  debug.log('               ┌───┘');

  return 'Start game and send game changes';
};

/**
 * Сдача игры
 */
module.exports.surrender = async (ctx) => {
  const { store, userId } = ctx;
  const { users } = store;
  const { gameId } = users[userId];

  // записываем последние действие пользователя
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
    },
  );

  return this.end(ctx, `${userId} surrender`);
};

/**
 * Завершение игры
 */
module.exports.end = async (ctx, resultGame) => {
  const { store, userId } = ctx;
  const { io, games, users } = store;
  const { gameId } = users[userId];

  // записываем результат игры
  await modelGame.update(
    {
      _id: ObjectId(gameId),
    },
    {
      $set: {
        result: resultGame,
      },
    },
  );

  // обновляем статус пользователей
  // удаляем нахождение пользователя в игре
  await modelUser.update(
    {
      _id: {
        $in: [
          ObjectId(games[gameId].users[0].id),
          ObjectId(games[gameId].users[1].id),
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

  // отправляем изменения игры
  io.to(gameId).emit('GameChanges', [{ event: 'endGame' }]);

  // удаляем игроков из игрового сокета
  games[gameId].users.forEach((user) => {
    users[user.id].socket.leave(gameId);
  });

  // останавливаем таймер
  games[gameId].timer.stop();

  // удалячем игру
  delete games[gameId];

  return 'GameData [end game]';
};

/**
 * Удаление не завершенных игр
 */
module.exports.clear = async () => {
  // записываем ошибку в результат игры
  modelGame.update(
    {
      result: null,
    },
    {
      $set: {
        result: 'error 500',
      },
    },
    { multi: true },
  );

  // обновляем статус пользователей
  // удаляем нахождение пользователя в игре
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
};

/**
 * Восстановление игры
 */
module.exports.restore = async (ctx) => {
  const { store, userId, data } = ctx;
  const { users, games } = store;
  const gameId = data.payload;

  // восстанавливаем игру из памяти
  if (games[gameId]) {
    users[userId].socket.emit('GameChanges', [{
      event: 'startGame',
      data: {
        gameId,
        ...store.games[gameId].restore(),
      },
    }]);
    return 'GameData [current state]';
  }

  // если нет в памяти, скорее всего она уже завершена
  // восстанавливаем результат игры из бд
  const game = await modelGame.findById(gameId);
  if (game && game.result) {
    users[userId].socket.emit('GameChanges', [{ event: 'endGame' }]);
    debug.chat(users[userId].socket, `games ${game.result}`);
    return 'GameData [end game - result]';
  }

  // если не получилось восстановить из бд
  users[userId].socket.emit('GameChanges', [{ event: 'endGame' }]);
  debug.chat(users[userId].socket, 'ERROR');

  // завершаем не законченые игры
  // HACK
  this.clear();

  return 'GameData [end game - error]';
};

/**
 * Смена хода
 */
module.exports.changeStep = async (ctx) => {
  const { store, userId } = ctx;
  const { io, users, games } = store;
  const { gameId } = users[userId];

  // запускаем смену хода
  const currentStepUserId = games[gameId].step.nextStep();

  // отправляем изменения игры
  io.to(gameId).emit('GameChanges', [{ event: 'nextStep', payload: currentStepUserId }]);
  debug.chat(io.to(gameId), { event: 'nextStep', payload: currentStepUserId });

  // перезапускаем таймер
  games[gameId].timer.reset();


  debug.log(`               │ GameData [next step - ${currentStepUserId}]`);
  debug.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');

  return `GameData [next step - ${currentStepUserId}]`;
};

/**
 * Проверка на AFK
 */
module.exports.checkTimeStep = async (ctx) => {
  const { store, userId } = ctx;
  const { games, users } = store;
  const { gameId } = users[userId];

  // если за пошедшее время не было событий выдаем штраф афк пользователю
  // передаем ход другому пользователю
  if (games[gameId].changes.getAllEventCount() === games[gameId].changes.getLastEventNumber()) {
    const currentStepUserId = games[gameId].step.getStep();
    const countAFK = games[gameId].users.find(user => user.id === currentStepUserId).addFineAFK();

    if (countAFK >= configGame.countAFK) {
      debug.log('               │ GameData [end game]');
      debug.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴');
      return this.end(ctx, `${currentStepUserId} afk`);
    }

    // записываем штраф афк
    await modelGame.update(
      {
        _id: ObjectId(gameId),
      },
      {
        $push: {
          steps: {
            user: ObjectId(currentStepUserId),
            action: 'afk',
          },
        },
      },
    );

    debug.log('               │');
    debug.log(`               ⁞ userId: ${currentStepUserId}`);
    debug.log(`               ⁞ AFK count: ${countAFK}`);
    debug.log('               │');

    return this.changeStep(ctx);
  }
};

/**
 *
 */
module.exports.fakeAction = async (ctx) => {
  const { store, userId } = ctx;
  const { games, users } = store;
  const { gameId } = users[userId];
  //
};
