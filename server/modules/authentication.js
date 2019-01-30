const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const Token = require('./token');
const Identification = require('./identification');

/**
 * Описание аунтификации через почту + пароль
 * @param {*}
 * @returns {*}
 */
module.exports.localStrategy = async (email, password) => {
  try {
    const user = await Identification.check({ email });
    if (user.checkPassword(password)) {
      const token = await Token.generateToken(user.id);
      if (token) {
        return {
          id: user.id,
          access: user.access,
          gameId: user.gameId,
          token,
        };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Описание аунтификации через JWT
 * @param {*}
 * @returns {*}
 */
module.exports.JWTStrategy = async (token) => {
  try {
    const userId = await Token.checkKeyOfToken(token);
    return await Identification.check({ _id: ObjectId(userId) });
  } catch (error) {
    return null;
  }
};
