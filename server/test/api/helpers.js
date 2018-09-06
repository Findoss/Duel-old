// models
const User = require('../../models/user');
const Session = require('../../models/session');

// controllers
const { generateToken } = require('../../controllers/token');

module.exports.clearUsers = async function clearUsers() {
  await User.remove({});
};

module.exports.clearSessions = async function clearSessions() {
  await Session.remove({});
};

module.exports.loadUsers = async (users) => {
  await User.create(users);
};

module.exports.signigFirstUser = async () => {
  const users = await User.find({});
  const userId = users[0]._id;
  return generateToken(userId);
};
