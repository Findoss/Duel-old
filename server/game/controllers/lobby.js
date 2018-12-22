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


  socket.emit('Chat', `count ${lobby.count()}`);// DEBUG chat
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.count()}`);// DEBUG chat
};

module.exports.users = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  socket.emit('Chat', `users ${lobby.listUserId()}`);// DEBUG chat
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.listUserId()}`);// DEBUG chat
};


module.exports.del = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;

  lobby.deleteUser(socket.userId);
  socket.emit('LobbyExit', 'exit111');

  socket.emit('Chat', 'delete you lobby');// DEBUG chat
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ del lobby');// DEBUG chat
};

module.exports.add = (ctx) => {
  const { socket, store } = ctx;
  const { lobby } = store;
  const { userId } = socket;

  if (!lobby.isUserInLobby(userId)) {
    lobby.addUser(socket, userId, 1200, configLobby.timeLimit);
    socket.emit('LobbyComeIn');
    socket.emit('Chat', `${userId} add lobby`);// DEBUG chat

    this.serchOpponent(ctx);
  } else {
    socket.emit('Chat', `${userId} уже в лобби`);// DEBUG chat
    console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ уже в лобби');// DEBUG chat
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

        console.log('               │');// DEBUG chat
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ delete lobby (time limit)');// DEBUG chat
        user.socket.emit('Chat', 'delete you lobby');// DEBUG chat
      });

      // если нет в лобби - останавливаем поиск пар
      if (lobby.count() === 0) {
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ stop serch opponent');// DEBUG chat
        clearInterval(idSerchOpponent);
      }

      // все кто в лобби отправляем время которое осталось
      lobby.listSerchTime().forEach((user) => {
        user.socket.emit('LobbyTime', user.time);

        user.socket.emit('Chat', `time: ${user.time}`);// DEBUG chat
      });
    }, 1000);
  }

  while (lobby.count() > 1) {
    // ищем пары
    const pair = lobby.serchOpponent();

    if (pair) {
      console.log('               │ pair of players');// DEBUG chat
      console.log('               │');// DEBUG chat
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ start game');// DEBUG chat

      pair.forEach((user) => {
        user.socket.emit('LobbyToGame', { gameId: '5c080b73bc72d1425590ac88' });
        user.socket.emit('Chat', 'start game');// DEBUG chat
      });
    }
  }
};
