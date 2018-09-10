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

module.exports.buySkills = async (userId, skills) => {
  const users = await User.find({});

  await User.findByIdAndUpdate(
    users[userId]._id,
    { $push: { skillsUnlocked: skills.map(skill => skill._id) } },
  );
};

module.exports.addSkillSet = async (userId, skills) => {
  const users = await User.find({});

  await User.findByIdAndUpdate(
    users[userId]._id,
    { $push: { skillSet: skills.map(skill => skill._id) } },
  );
};

module.exports.signigUser = async (id) => {
  const users = await User.find({});
  const userId = users[id]._id;
  return generateToken(userId);
};
