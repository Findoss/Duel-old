const ResponseError = require('../../utils/error');

const User = require('../../models/user');
const PasswordReset = require('../../models/password_reset');

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
    const email = await User.findOne({ email: ctx.query.email }, 'email');
    ctx.response.body = { used: Boolean(email) };
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.checkPasswordResetLink = async (ctx) => {
  try {
    // найдем пользователя по хэш и отправим имя
    const document = await PasswordReset.findOne({ hash: ctx.query.link });
    const user = await User.findById(document.userId, 'nickname');

    if (user) ctx.response.body = { nickname: user.nickname };
    else throw new ResponseError(400, 'Invalid link');
  } catch (error) {
    throw new ResponseError(400, 'Invalid link, It looks like you clicked on an invalid password reset link. Please try again.');
  }
};
