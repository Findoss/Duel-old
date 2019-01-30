/* eslint no-console: 0 */
// правило отключено потому что это важыный элемент логов, необходимо вынести в модуль

const configLobby = require('../../static/lobby.json');
const ctrlGame = require('./game');


module.exports.count = (ctx) => {
  const { store, userId } = ctx;
  const { lobby, players } = store;

  const result = lobby.count();

  players[userId].socket.emit('Chat', `users ${result}`);
  return result;
};

module.exports.users = (ctx) => {
  const { store, userId } = ctx;
  const { lobby, players } = store;

  const result = lobby.listUserId();

  players[userId].socket.emit('Chat', result);
  return result;
};

module.exports.del = (ctx) => {
  const { store, userId } = ctx;
  const { lobby, players } = store;

  lobby.deleteUser(userId);
  players[userId].socket.emit('LobbyExit', 'exit');

  players[userId].socket.emit('Chat', 'delete you lobby');// -------------------------- DEBUG chat
  return 'LobbyExit exit';
};

module.exports.add = (ctx) => {
  const { store, userId } = ctx;
  const { lobby, players } = store;

  if (!lobby.isUserInLobby(userId)) {
    lobby.addUser(userId, 1200, configLobby.timeLimit);
    players[userId].socket.emit('LobbyComeIn');
    players[userId].socket.emit('Chat', `${userId} add lobby`);// --------------------- DEBUG chat

    this.serchOpponent(ctx);
    return 'LobbyComeIn';
  }
  players[userId].socket.emit('Chat', 'already in the lobby');// ---------------------- DEBUG chat
  return 'already in the lobby';
};

module.exports.serchOpponent = (ctx) => {
  const { store, userId } = ctx;
  const { lobby, players } = store;

  if (lobby.count() === 1) {
    console.log('               ⁞ serch opponent');// --------------------------------- DEBUG chat
    console.log('               │');// ------------------------------------------------ DEBUG chat

    const idSerchOpponent = setInterval(() => {
      // очищаем лобби если есть лимиты ожидания
      lobby.clear().forEach((user) => {
        players[user.id].socket.emit('LobbyExit', 'limit');

        console.log('               │ ');// ------------------------------------------- DEBUG chat
        console.log(`┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ⁞ ${userId} delete lobby (time limit)`);// -------- DEBUG chat
        console.log('               │ ');// ------------------------------------------- DEBUG chat
        players[user.id].socket.emit('Chat', 'delete you lobby');// ------------------------------- DEBUG chat
      });

      // если нет в лобби - останавливаем поиск пар
      if (lobby.count() === 0) {
        console.log('               ⁞ ');// ------------------------------------------- DEBUG chat
        console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ stop serch opponent');// ------------------------ DEBUG chat

        clearInterval(idSerchOpponent);
      }

      // все кто в лобби отправляем время которое осталось
      lobby.listSerchTime().forEach((user) => {
        players[user.id].socket.emit('LobbyTime', user.time);
        players[user.id].socket.emit('Chat', `time: ${user.time}`);// ----------------- DEBUG chat
      });
    }, 1000);
  }

  while (lobby.count() > 1) {
    // ищем пары
    const pair = lobby.serchOpponent();

    if (pair) {
      ctrlGame.start(ctx, pair);
      console.log('               ⁞ pair of players');// ------------------------------ DEBUG chat
      console.log('               │');// ---------------------------------------------- DEBUG chat
      console.log('┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ┴ start game');// ----------------------------------- DEBUG chat
    }
  }
};
