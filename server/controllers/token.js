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

module.exports.checkKey = async (payload) => {
  const session = await Session.findOne({ id: payload.id }, 'key');
  return session && payload.key === session.key;
};

module.exports.deleteKey = async (payload) => {
  const remove = await Session.remove(
    { id: payload.id },
    { upsert: true },
  );
  console.log(remove);
};
