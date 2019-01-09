const ResponseError = require('../utils/error');

const User = require('../models/user');

/**
 * Индификация по id
 * @param {String} userId пользователя
 * @returns {Object} Возвращает user (id nickname password access), при ошибке ResponseError
 */
module.exports.byId = async (userId) => {
  try {
    return User.findById(userId, 'id password nickname access');
  } catch (error) {
    throw new ResponseError(404, 'Not found');
  }
};

/**
 * Индификация по почте
 * @param {String} email почта пользователя
 * @returns {Object} Возвращает user (id nickname password access), при ошибке ResponseError
 */
module.exports.byEmail = async (email) => {
  try {
    return User.findOne({ email }, 'id password nickname access');
  } catch (error) {
    throw new ResponseError(404, 'Not found');
  }
};
