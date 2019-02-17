/**
 * Количество пользователей в мире
 */
module.exports.usersCount = async (ctx) => {
  const { store, userId } = ctx;
  const { users } = store;

  const result = Object.keys(users).length;

  users[userId].socket.emit('Chat', `world users count ${result}`);
  return result;
};

/**
 * Массив пользователей в мире
 */
module.exports.users = async (ctx) => {
  const { store, userId } = ctx;
  const { users } = store;

  const result = Object.keys(users);

  users[userId].socket.emit('Chat', result);
  return result;
};

/**
 * Количество игр в мире
 */
module.exports.gamesCount = async (ctx) => {
  const { store, userId } = ctx;
  const { users } = store;

  const result = Object.keys(store.games).length;

  users[userId].socket.emit('Chat', `games ${result}`);
  return result;
};

/**
 * Количество пользователей в лобби
 */
module.exports.usersLobbyCount = async (ctx) => {
  const { store, userId } = ctx;
  const { lobby, users } = store;

  const result = lobby.count();

  users[userId].socket.emit('Chat', `users ${result}`);
  return result;
};

/**
 * Массив пользователей в лобби
 */
module.exports.usersLobby = async (ctx) => {
  const { store, userId } = ctx;
  const { lobby, users } = store;

  const result = lobby.listUserId();

  users[userId].socket.emit('Chat', result);
  return result;
};
