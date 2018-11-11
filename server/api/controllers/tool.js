const ResponseError = require('../../utils/error');

const User = require('../../models/user');

/**
 * TODO описание
 * @param {*}
 */
module.exports.checkNickname = async (ctx) => {
  try {
    const nickname = await User.findOne({ nickname: ctx.query.nickname }, 'nickname');
    ctx.response.body = { used: Boolean(nickname) };
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.checkEmail = async (ctx) => {
  try {
    const email = await User.findOne({ nickname: ctx.query.email }, 'email');
    ctx.response.body = { used: Boolean(email) };
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }
};
