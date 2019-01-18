const ResponseError = require('../utils/error');

const User = require('../models/user');

/**
 * Индификация по id или почте
 * @param {String} field id или почта пользователя
 * @returns {Object} Возвращает user (id nickname password access), при ошибке ResponseError
 */
module.exports.check = async (field) => {
  try {
    return await User.findOne(field, 'id nickname access status password');
  } catch (error) {
    throw new ResponseError(404, 'Not found');
  }
};
