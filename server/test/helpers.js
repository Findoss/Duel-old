const config = require('../config');
const { exec } = require('child_process');

// models
const User = require('./../models/user');
const Session = require('./../models/session');
const Skill = require('./../models/skill');

// const
const mongoImport = `mongoimport -d ${config.db.name}`;

// controllers
const { generateToken } = require('./../controllers/token');

const cmd = command => new Promise((res, rej) => exec(command, err => (err ? rej(err) : res())));


module.exports.loadCollection = async (collection, file) => cmd(`${mongoImport} -c ${collection} --file ${file}`);

module.exports.clearUsers = async () => User.remove({});
module.exports.clearSkill = async () => Skill.remove({});
module.exports.clearSessions = async () => Session.remove({});


// todo

module.exports.buySkills = async (userId, skills) => {
  const users = await User.find({});

  await User.findByIdAndUpdate(
    users[userId].id,
    { $push: { skillsUnlocked: skills.map(skill => skill.id) } },
  );
};

module.exports.addSkillSet = async (userId, skills) => {
  const users = await User.find({});

  await User.findByIdAndUpdate(
    users[userId].id,
    { $push: { skillSet: skills.map(skill => skill.id) } },
  );
};

module.exports.signigUser = async (id) => {
  const users = await User.find({});
  const userId = users[id].id;
  const token = await generateToken(userId);
  return `Bearer ${token}`;
};
