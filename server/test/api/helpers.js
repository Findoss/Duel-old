// models
const User = require('../../models/user');
const Session = require('../../models/session');
const Skill = require('../../models/skill');

// controllers
const { generateToken } = require('../../controllers/token');

module.exports.clearSessions = async () => Session.remove({});

module.exports.clearUsers = async () => User.remove({});
module.exports.loadUsers = async users => User.create(users);

module.exports.clearSkills = async () => Skill.remove({});
module.exports.loadSkills = async skills => Skill.create(skills);

module.exports.signigFirstUser = async () => {
  const users = await User.find({});
  const userId = users[0]._id;
  return generateToken(userId);
};
