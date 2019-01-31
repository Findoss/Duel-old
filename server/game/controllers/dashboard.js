module.exports.usersCount = (ctx) => {
  const { store, userId } = ctx;
  const { players } = store;

  const result = Object.keys(players).length;

  players[userId].socket.emit('Chat', `world users count ${result}`);
  return result;
};

module.exports.users = (ctx) => {
  const { store, userId } = ctx;
  const { players } = store;

  const result = Object.keys(players);

  players[userId].socket.emit('Chat', result);
  return result;
};
