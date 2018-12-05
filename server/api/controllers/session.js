const ResponseError = require('../../utils/error');
const passport = require('koa-passport');
const Token = require('./token');

/**
 * TODO описание
 * @param {*}
 */
module.exports.signin = async (ctx, next) => {
  await passport.authenticate('local', (error, user) => {
    if (error) throw new ResponseError(523, error);

    if (user) {
      ctx.response.body = {
        id: user.id,
        message: 'You are signed in',
        token: user.token,
      };
    } else {
      throw new ResponseError(403, 'Incorrect username or password');
    }
  })(ctx, next);
  await next();
};
/**
 * TODO описание
 * @param {*}
 */
module.exports.passwordReset = async (ctx, next) => {
  await '555';
  ctx.response.body = {
    message: 'Ok',
  };
  await next();
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.signout = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await Token.deleteKey(ctx.state.user.id);
    ctx.response.body = {
      message: 'You are signed out',
    };
  }
  await next();
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.tokenVerification = async (ctx, next) => {
  await passport.authenticate('jwt', (error, user) => {
    if (error) throw new ResponseError(523, error);

    if (user) ctx.state.user = user;
    else throw new ResponseError(403, 'Forbidden');

    return user;
  })(ctx, next);
  await next();
};
