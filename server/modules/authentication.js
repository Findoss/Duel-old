const Token = require('./token');
const Identification = require('./identification');

/**
 * Описание аунтификации через почту + пароль
 * @param {*}
 * @returns {*}
 */
module.exports.localStrategy = async (email, password) => {
  try {
    const user = Identification.byEmail(email);

    if (user.checkPassword(password)) {
      const token = await Token.generateToken(user.id);
      if (token) {
        return {
          id: user.id,
          access: user.access,
          status: user.status,
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
    return await Identification.byId(userId);
  } catch (error) {
    return null;
  }
};
