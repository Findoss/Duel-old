const config = {
  ...require('../config/default.json'),
  ...require('../config/production.json'),
};

const mongoose = require('mongoose');
const Session = require('../models/session');

const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

module.exports.generateToken = async (userId) => {
  const key = uuidv4();

  const token = await jwt.sign(
    { id: userId, key },
    config.JWTKey,
  );

  const session = await Session.update(
    { id: userId },
    { id: userId, key },
    { upsert: true },
  );

  if (session) return token;
  return false;
};

module.exports.checkKey = async (user) => {
  const session = await Session.findOne({ id: user.id }, 'key');
  return session && user.key === session.key;
};

module.exports.deleteKey = async (userId) => {
  const isRemove = await Session.remove({ id: userId });
  return isRemove;
};
