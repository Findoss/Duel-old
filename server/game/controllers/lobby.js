const debug = require('../../utils/debug');

const configLobby = require('../../static/lobby.json');

const ctrlGame = require('./game');

/**
 * Удаление пользователя из лобби
 */
module.exports.del = async (ctx) => {
  const { store, userId } = ctx;
  const { lobby, users } = store;

  lobby.deleteUser(userId);

  users[userId].socket.emit('LobbyExit', 'exit');
  debug.chat(users[userId].socket, 'delete you lobby');

  return 'Exit';
};

/**
 * Добавление пользователя из лобби
 */
module.exports.add = async (ctx) => {
  const { store, userId } = ctx;
  const { lobby, users } = store;

  if (!lobby.isUserInLobby(userId)) {
    lobby.addUser(userId, 1200, configLobby.timeLimit);

    users[userId].socket.emit('LobbyComeIn');
    debug.chat(users[userId].socket, `${userId} add lobby`);

    this.serchOpponent(ctx);
    return 'Come in';
  }

  debug.chat(users[userId].socket, 'already in the lobby');

  return 'Already in the lobby';
};

/**
 * Поиск пар пользователей
 */
module.exports.serchOpponent = async (ctx) => {
  const { store, userId } = ctx;
  const { lobby, users } = store;

  // запускае поиск если есть пользователь в очереди
  if (lobby.count() === 1) {
    debug.log('               └───┐');
    debug.log('                   ⁞ serch opponent');
    debug.log('               ┌───┘');

    const idSerchOpponent = setInterval(() => {
      // очищаем лобби если есть лимиты ожидания
      lobby.clear().forEach((user) => {
        users[user.id].socket.emit('LobbyExit', 'limit');

        debug.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${userId} delete lobby (time limit)`);
        debug.chat(users[userId].socket, 'delete you lobby (time limit)');
      });

      // если нет в лобби - останавливаем поиск пар
      if (lobby.count() === 0) {
        debug.log('               └───┐');
        debug.log('                   ⁞ stop serch opponent');
        debug.log('               ┌───┘');
        clearInterval(idSerchOpponent);
      }

      // все кто в лобби отправляем время которое осталось
      lobby.listSerchTime().forEach((user) => {
        users[user.id].socket.emit('LobbyTime', user.time);
        debug.chat(users[user.id].socket, `time: ${user.time}`);
      });
    }, 1000);
  }

  while (lobby.count() > 1) {
    // функция поиска пары
    const pair = lobby.serchOpponent();

    if (pair) {
      ctrlGame.start(ctx, pair);
      debug.log('               └───┐');
      debug.log('                   ⁞ pair of users');
      debug.log('               ┌───┘');
    }
  }
};
