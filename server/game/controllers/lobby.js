/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const configLobby = require('../../static/lobby.json');
const ctrlGame = require('./game');


module.exports.count = (ctx) => {
  const { store, socket } = ctx;
  const { lobby } = store;

  socket.emit('Chat', `count ${lobby.count()}`);
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.count()}`);// DEBUG chat
};

module.exports.users = (ctx) => {
  const { store, socket } = ctx;
  const { lobby } = store;

  socket.emit('Chat', `users ${lobby.listUserId()}`);
  console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${lobby.listUserId()}`);// DEBUG chat
};

module.exports.del = (ctx) => {
  const { state, store, socket } = ctx;
  const { userId } = state;
  const { lobby } = store;

  lobby.deleteUser(userId);
  socket.emit('LobbyExit', 'exit');

  socket.emit('Chat', 'delete you lobby');
  console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ del lobby');// DEBUG chat
};

module.exports.add = (ctx) => {
  const { state, store, socket } = ctx;
  const { userId, nickname } = state;
  const { lobby } = store;

  if (!lobby.isUserInLobby(userId)) {
    lobby.addUser(socket, userId, 1200, configLobby.timeLimit);
    socket.emit('LobbyComeIn');
    socket.emit('Chat', `${nickname} add lobby`);// DEBUG chat

    this.serchOpponent(ctx);
  } else {
    socket.emit('Chat', `${nickname} уже в лобби`);// DEBUG chat
    console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ уже в лобби');// DEBUG chat
  }
};

module.exports.serchOpponent = (ctx) => {
  const { store, state } = ctx;
  const { lobby } = store;
  const { nickname } = state;

  if (lobby.count() === 1) {
    console.log('               ⁞ serch opponent');
    console.log('               │');

    const idSerchOpponent = setInterval(() => {
      // очищаем лобби если есть лимиты ожидания
      lobby.clear().forEach((user) => {
        user.socket.emit('LobbyExit', 'limit');

        console.log('               │');// DEBUG chat
        console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ ${nickname} delete lobby (time limit)`);// DEBUG chat
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
      ctrlGame.start(ctx, pair);
      console.log('               │ pair of players');// DEBUG chat
      console.log('               │');// DEBUG chat
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ start game');// DEBUG chat
    }
  }
};
