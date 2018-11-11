const config = require('../config');
const { exec } = require('child_process');

// models
const User = require('./../models/user');
const Session = require('./../models/session');
const Skill = require('./../models/skill');

// const
const mongoImport = `mongoimport -d ${config.db.name}`;
const cmd = command => new Promise((res, rej) => exec(command, err => (err ? rej(err) : res())));


/**
 * TODO описание
 * @param {*}
 */
module.exports.loadCollection = async (collection, file) => cmd(`${mongoImport} -c ${collection} --file ${file}`);

module.exports.clearUsers = async () => User.remove({});
module.exports.clearSkills = async () => Skill.remove({});
module.exports.clearSessions = async () => Session.remove({});

/**
 * TODO описание
 * @param {*}
 */
module.exports.buySkills = async (userId, ...skillsId) => {
  await User.findByIdAndUpdate(
    userId,
    { $push: { skillsUnlocked: skillsId } },
  );
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.addSkillSet = async (userId, ...skillsId) => {
  await User.findByIdAndUpdate(
    userId,
    { $push: { skillSet: skillsId } },
  );
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.addGold = async (userId, count) => {
  await User.findByIdAndUpdate(
    userId,
    { $set: { gold: count } },
  );
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.addPoint = async (userId, count) => {
  await User.findByIdAndUpdate(
    userId,
    { $set: { points: count } },
  );
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.openSlot = async (userId, count) => {
  await User.findByIdAndUpdate(
    userId,
    { $set: { openSlot: count } },
  );
};
