const passport = require('koa-passport');
const Session = require('../models/session');


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
};

module.exports.signout = async function signout(ctx) {
  // await passport.authenticate('jwt', (error, verified) => {
  //   if (error) {
  //     ctx.status = 500;
  //     ctx.response.body = {
  //       message: 'BABAX BD',
  //       code: '1001',
  //     };
  //   }

  //   if (verified) {
  //     ctx.response.body = {
  //       message: 'You are signed out',
  //     };
  //   } else {
  //     ctx.response.code = 403;
  //     ctx.response.body = {
  //       message: 'Forbidden',
  //       code: 'forbidden',
  //     };
  //   }
  // });
  // (ctx, next);
};

module.exports.verificationToken = async (ctx, next) => {
  await passport.authenticate('jwt', async (error, payload) => {
    if (error) {
      ctx.status = 500;
      ctx.response.body = {
        message: 'BABAX BD',
        code: '1001',
      };
    }
    console.log(payload);

    if (!payload) {
      ctx.response.code = 403;
      ctx.response.body = {
        message: 'Forbidden',
        code: 'forbidden',
      };
    }
  });

  await next();
};
