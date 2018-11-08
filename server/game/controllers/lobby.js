const configLobby = require('../../static/lobby.json');

/**
 * io - all
 * socket - user
 * room - filter user
 */


module.exports.count = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  // debug chat
  socket.emit('Chat', `count ${lobby.count()}`);
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.count()}`);
};

module.exports.users = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  // debug chat
  socket.emit('Chat', `users ${lobby.listUserId()}`);
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.listUserId()}`);
};


module.exports.del = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  lobby.deleteUser(socket.userId);
  socket.emit('LobbyExit', 'exit111');

  // debug chat
  socket.emit('Chat', 'delete you lobby');
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ del lobby');
};

module.exports.add = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;
  const { userId } = socket;

  if (!lobby.isUserInLobby(userId)) {
    lobby.addUser(socket, userId, 1200, configLobby.timeLimit);
    // debug chat
    socket.emit('Chat', `${userId} add lobby`);

    this.serchOpponent(ctx);
  } else {
    // debug chat
    socket.emit('Chat', `${userId} уже в лобби`);
    console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ уже в лобби');
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

        console.log('               │');
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ delete lobby (time limit)');
        // debug chat
        user.socket.emit('Chat', 'delete you lobby');
      });

      // если нет в лобби - останавливаем поиск пар
      if (lobby.count() === 0) {
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ stop serch opponent');
        clearInterval(idSerchOpponent);
      }

      // все кто в лобби отправляем время которое осталось
      lobby.listSerchTime().forEach((user) => {
        user.socket.emit('LobbyTime', user.time);

        // debug chat
        user.socket.emit('Chat', `time: ${user.time}`);
      });
    }, 1000);
  }

  while (lobby.count() > 1) {
    // ищем пары
    const pair = lobby.serchOpponent();

    if (pair) {
      console.log('               │ pair of players');
      console.log('               │');
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ start game');

      pair.forEach((user) => {
        user.socket.emit('LobbyGo', 'go1111');
        // debug chat
        user.socket.emit('Chat', 'go');
      });
    }
  }
};
