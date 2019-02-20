const crypto = require('crypto');
const mongoose = require('mongoose');
const debug = require('../../utils/debug');
const logger = require('../middleware/logger');

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
  const { io, games } = store;

  // генерируем строку для псевдорандома
  const solt = crypto
    .randomBytes(40)
    .toString('hex')
    .toUpperCase();

  // создаем документ игры в бд
  const { id } = await modelGame.create({
    users: [
      ObjectId(pair[0].id),
      ObjectId(pair[1].id),
    ],
    solt,
  });

  // обновляем статус пользователя
  // указываем в какой игре пользователь находиться
  const userOne = await modelUser.findOneAndUpdate(
    {
      _id: ObjectId(pair[0].id),
    },
    { $set: { gameId: id } },
  );

  const userTwo = await modelUser.findOneAndUpdate(
    {
      _id: ObjectId(pair[1].id),
    },
    { $set: { gameId: id } },
  );

  // инициализируем игру
  games[id] = new Game([userOne, userTwo], id, solt);

  // создаем список изменений в игре
  games[id].changes.add('startGame', {
    gameId: id,
    newBoard: games[id].board.generationBoard(games[id].seedRandom),
    users: games[id].users,
    step: games[id].step.coinToss(games[id].seedRandom),
  });

  // подключаем сокеты пользователей к игровому сокету
  pair.forEach((user) => {
    store.users[user.id].socket.join(id);
    store.users[user.id].gameId = id;
  });

  // фиксируем количество игровых событий
  games[id].changes.fixEventNumber();

  // инициализируем таймер для обработки лимитов на ход по времени
  // дескриптор указан в поле timer
  games[id].timer = new Timer(this.checkTimeStep, configGame.timeStep, ctx);
  games[id].timer.start();

  // debug
  debug.chat(io.to(id), `id ${id}`);
  // debug.log('               └───┐');
  // debug.log(`                   │ gameId: ${id}`);
  // debug.log('                   │ start game');
  // debug.log('               ┌───┘');

  // отправляем изменения игры
  return this.sendGameChanges(ctx);
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
  const { games, users } = store;
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

  // создаем список изменений в игре
  games[gameId].changes.add('endGame');

  // отправляем изменения игры
  const result = await this.sendGameChanges(ctx);

  // удаляем игроков из игрового сокета
  games[gameId].users.forEach((user) => {
    if (users[user.id].socket) {
      users[user.id].socket.leave(gameId);
    }
  });

  // останавливаем таймер
  games[gameId].timer.stop();

  // удалячем игру
  delete games[gameId];

  return result;
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
 * Смена хода
 */
module.exports.changeStep = async (ctx) => {
  const { store, userId } = ctx;
  const { io, users, games } = store;
  const { gameId } = users[userId];

  // запускаем смену хода
  const currentStepUserId = games[gameId].step.nextStep();

  // создаем список изменений в игре
  games[gameId].changes.add('nextStep', { currentStepUserId });

  // фиксируем количество игровых событий
  games[gameId].changes.fixEventNumber();

  // debug
  debug.chat(io.to(gameId), { event: 'nextStep', payload: currentStepUserId });

  // перезапускаем таймер
  games[gameId].timer.reset();

  // отправляем изменения игры
  return this.sendGameChanges(ctx);
};

/**
 * Проверка на AFK
 */
module.exports.checkTimeStep = async (ctx) => {
  const { store, userId } = ctx;
  const { games, users } = store;
  const { gameId } = users[userId];

  if (games[gameId]) {
    // если за пошедшее время не было событий выдаем штраф афк пользователю
    // передаем ход другому пользователю
    if (games[gameId].changes.getAllEventCount() === games[gameId].changes.getLastEventNumber()) {
      const currentStepUserId = games[gameId].step.getStep();
      const countAFK = games[gameId].users.find(user => user.id === currentStepUserId).addFineAFK();

      debug.log('               │');
      debug.log(`               ⁞ userId: ${currentStepUserId}`);
      debug.log(`               ⁞ AFK count: ${countAFK}`);
      debug.log('               │');

      if (countAFK >= configGame.countAFK) {
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

      return this.changeStep(ctx);
    }
  }
  return '???';
};

/**
 *
 */
module.exports.fakeAction = async (ctx) => {
  const { store, userId } = ctx;
  const { games, users } = store;
  const { gameId } = users[userId];


  if (games[gameId].step.isStep(userId)) {
    return this.changeStep(ctx);
  }

  // debug
  debug.chat(users[userId].socket, { event: 'fakeAction', payload: 'NO!' });

  return '???';
};

/**
 *
 */
module.exports.sendGameChanges = async (ctx) => {
  const { store, userId } = ctx;
  const { io, users, games } = store;
  const { gameId } = users[userId];

  const data = games[gameId].changes.release();

  // debug
  logger.sendData(data);

  // отправляем изменения игры
  try {
    await io.to(gameId).emit('GameChanges', data);
    return data;
  } catch (error) {
    return error;
  }
};

/**
 *
 */
module.exports.check = async (ctx) => {
  const { store, userId } = ctx;
  const { users, games } = store;
  const { gameId } = users[userId];

  if (gameId && games[gameId]) return true;

  throw new Error('WTF NO GAME');
};


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

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
    return '???';
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

  return '???';
};
