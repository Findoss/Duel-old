const passport = require('koa-passport');
const Token = require('./token');


module.exports.signin = async (ctx, next) => {
  await passport.authenticate('local', (error, user) => {
    if (error) {
      ctx.status = 500;
      ctx.response.body = {
        message: 'BABAX BD',
        code: '1000',
      };
    }

    if (user) {
      ctx.response.body = {
        id: user.id,
        message: 'You are signed in',
        token: user.token,
      };
    } else {
      ctx.status = 403;
      ctx.response.body = {
        message: 'Incorrect username or password',
        code: 'forbidden',
      };
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
    if (error) {
      ctx.status = 500;
      ctx.response.body = {
        message: 'BABAX BD',
        code: '1001',
      };
    }

    if (user) {
      ctx.state.user = user;
    } else {
      ctx.response.code = 403;
      ctx.response.body = {
        message: 'Forbidden',
        code: 'forbidden',
      };
    }

    return user;
  })(ctx, next);
  await next();
};
