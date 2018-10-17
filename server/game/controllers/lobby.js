const configLobby = require('../../static/lobby.json');

module.exports.del = (ctx) => {
  const { socket, state } = ctx;
  const { lobby } = state;

  lobby.deleteUser(socket.userId);
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ del lobby');
};

module.exports.add = (ctx) => {
  const { socket, state } = ctx;
  const { lobby } = state;
  const { userId } = socket;

  lobby.addUser(socket, userId, 1200, configLobby.timeLimit);

  // debug chat
  socket.emit('chat', `${userId} add lobby`);

  if (lobby.count() === 1) {
    console.log('               ⁞ serch opponent');
    console.log('               │');
    this.serchOpponent(ctx);
  }
};

module.exports.serchOpponent = (ctx) => {
  const { state } = ctx;
  const { lobby } = state;

  const idSerchOpponent = setInterval(() => {
    // ищем пары
    const pair = lobby.serchOpponent();

    if (pair) {
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ pair of players');

      pair.forEach((user) => {
        // debug chat
        user.socket.emit('chat', 'go');
      });
    }

    // очищаем лобби если есть лимиты ожидания
    lobby.clear().forEach((user) => {
      console.log('               ⁞ delete lobby (time limit)');
      console.log('               │');
      // debug chat
      user.socket.emit('chat', 'delete you lobby');
    });

    // если нет в лобби - останавливаем поиск пар
    if (lobby.count() === 0) {
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ stop serch opponent');
      clearInterval(idSerchOpponent);
    }

    // все кто в лобби отправляем время которое осталось
    lobby.listSerchTime().forEach((user) => {
      // debug chat
      user.socket.emit('chat', `time: ${user.time}`);
    });
  }, 1000);
};
