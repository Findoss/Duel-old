const ResponseError = require('../utils/error');
const passport = require('koa-passport');
const Token = require('./token');

module.exports.signin = async (ctx, next) => {
  await passport.authenticate('local', (error, user) => {
    if (error) throw new ResponseError(500, 'db 0001');

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

module.exports.signout = async function signout(ctx, next) {
  if (ctx.isAuthenticated()) {
    await Token.deleteKey(ctx.state.user.id);
    ctx.response.body = {
      message: 'You are signed out',
    };
  }
  await next();
};

module.exports.verificationToken = async (ctx, next) => {
  await passport.authenticate('jwt', (error, user) => {
    if (error) throw new ResponseError(500, 'db 0002');

    if (user) ctx.state.user = user;
    else throw new ResponseError(403, 'Forbidden');

    return user;
  })(ctx, next);
  await next();
};
