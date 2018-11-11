/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const configLobby = require('../../static/lobby.json');

/**
 * io - all
 * socket - user
 * room - filter user
 */


module.exports.count = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  // DEBUG chat
  socket.emit('Chat', `count ${lobby.count()}`);
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.count()}`);
  // DEBUG chat-end
};

module.exports.users = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  // DEBUG chat
  socket.emit('Chat', `users ${lobby.listUserId()}`);
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.listUserId()}`);
  // DEBUG chat-end
};


module.exports.del = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  lobby.deleteUser(socket.userId);
  socket.emit('LobbyExit', 'exit111');

  // DEBUG chat
  socket.emit('Chat', 'delete you lobby');
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ del lobby');
  // DEBUG chat-end
};

module.exports.add = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;
  const { userId } = socket;

  if (!lobby.isUserInLobby(userId)) {
    lobby.addUser(socket, userId, 1200, configLobby.timeLimit);
    // DEBUG chat
    socket.emit('Chat', `${userId} add lobby`);
    // DEBUG chat-end

    this.serchOpponent(ctx);
  } else {
    // DEBUG chat
    socket.emit('Chat', `${userId} уже в лобби`);
    console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ уже в лобби');
    // DEBUG chat-end
  }
};

module.exports.serchOpponent = (ctx) => {
  const { store } = ctx;
  const { lobby } = store;

  if (lobby.count() === 1) {
    console.log('               ⁞ serch opponent');
    console.log('               │');

    const idSerchOpponent = setInterval(() => {
      // очищаем лобби если есть лимиты ожидания
      lobby.clear().forEach((user) => {
        user.socket.emit('LobbyExit', 'exit222');

        // DEBUG chat
        console.log('               │');
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ delete lobby (time limit)');
        // DEBUG chat-end
        // DEBUG chat
        user.socket.emit('Chat', 'delete you lobby');
        // DEBUG chat-end
      });

      // если нет в лобби - останавливаем поиск пар
      if (lobby.count() === 0) {
        // DEBUG chat
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ stop serch opponent');
        // DEBUG chat-end
        clearInterval(idSerchOpponent);
      }

      // все кто в лобби отправляем время которое осталось
      lobby.listSerchTime().forEach((user) => {
        user.socket.emit('LobbyTime', user.time);

        // DEBUG chat
        user.socket.emit('Chat', `time: ${user.time}`);
        // DEBUG chat-end
      });
    }, 1000);
  }

  while (lobby.count() > 1) {
    // ищем пары
    const pair = lobby.serchOpponent();

    if (pair) {
      // DEBUG chat
      console.log('               │ pair of players');
      console.log('               │');
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ start game');
      // DEBUG chat-end

      pair.forEach((user) => {
        // DEBUG chat
        user.socket.emit('LobbyGo', 'go1111');
        // DEBUG chat-end
        // DEBUG chat
        user.socket.emit('Chat', 'go');
        // DEBUG chat-end
      });
    }
  }
};
