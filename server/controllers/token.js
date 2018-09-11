const config = require('../config/index');

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
    { userId },
    { userId, key },
    { upsert: true },
  );

  if (session) return token;
  return false;
};

module.exports.checkKey = async (userId, userKey) => {
  const session = await Session.findOne({ userId }, 'key');
  return session && userKey === session.key;
};

module.exports.deleteKey = async (userId) => {
  const isRemove = await Session.remove({ userId });
  return isRemove;
};
