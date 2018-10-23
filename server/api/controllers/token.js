const config = require('../../config/index');

const mongoose = require('mongoose');
const Session = require('../../models/session');

const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

module.exports.generateToken = async (userId) => {
  const key = uuidv4();

  try {
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
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.checkKey = async (userId, userKey) => {
  try {
    const session = await Session.findOne({ userId }, 'key');
    return session && userKey === session.key;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteKey = async (userId) => {
  try {
    const isRemove = await Session.remove({ userId });
    return isRemove;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.checkSocketToken = async (token) => {
  try {
    const { id, key } = jwt.verify(token, config.JWTKey);
    if (this.checkKey(id, key)) return id;
    return false;
  } catch (error) {
    return false;
  }
};
