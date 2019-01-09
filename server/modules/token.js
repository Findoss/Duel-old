const config = require('../config/index');

const Session = require('../models/session');

const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

/**
 * Генерация ключа, создание токена и запись ключа в сессию
 * @param {String} userId id пользователя
 * @return {String} Возвращает токен
 */
module.exports.generateToken = async (userId, access) => {
  const key = uuidv4();

  try {
    const token = await jwt.sign({ id: userId, key }, config.JWTKey);
    const session = await Session.update({ userId }, { userId, key, access }, { upsert: true });

    if (session) return token;
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Проверяет ключ сессии на его актуальность
 * @param {String} userId id пользователя
 * @param {String} userKey ключ сессии пользователя
 * @returns {Boolean} Возвращает true если ключ актуален
 */
module.exports.checkKey = async (userId, userKey) => {
  try {
    const session = await Session.findOne({ userId }, 'key');
    return session && userKey === session.key;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Удаляет ключ сессии
 * @param {String} userId id пользователя
 * @returns {Boolean} Возвращает true если ключ удален
 */
module.exports.deleteKey = async (userId) => {
  try {
    const isRemove = await Session.remove({ userId });
    return isRemove;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Проверяет ключ сессии на его актуальность из токена
 * @param {String} token токен
 * @returns {Boolean} Возвращает true если ключ актуален
 */
module.exports.checkKeyOfToken = async (token) => {
  try {
    const { id, key } = jwt.verify(token, config.JWTKey);
    if (this.checkKey(id, key)) return id;
    return false;
  } catch (error) {
    return false;
  }
};
