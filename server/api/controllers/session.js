const config = require('../../config');

const ResponseError = require('../../utils/error');
const passport = require('koa-passport');

const ctrlToken = require('./token');
const ctrlUser = require('./user');

const User = require('../../models/user');
const PasswordReset = require('../../models/password_reset');

const transporterEmail = require('./smtp');
const templetePasswordReset = require('../templates/password_reset');

console.log(templetePasswordReset);


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
  try {
    // найдем пользователя по почте
    const user = await User.findOne({ email: ctx.request.body.email }, 'email');

    // сформируем хэш
    const passwordReset = new PasswordReset();
    const hashPasswordReset = await PasswordReset.findOneAndUpdate(
      { userId: user.id },
      { userId: user.id, hash: passwordReset.genHashPasswordReset() },
      { upsert: true, new: true },
    );

    const link = `${config.node.host}password-new/${hashPasswordReset.hash}`;

    // отправим по почте
    // console.log('send mail ', `http://localhost:3002/password-new/${hashPasswordReset.hash}`);

    transporterEmail.sendMail(
      {
        from: {
          name: 'Support game Duel',
          address: config.email.address,
        },
        to: ctx.request.body.email,
        subject: 'Please reset your password',
        text: link,
        html: templetePasswordReset(link),
      },
      (error) => {
        if (error) throw new ResponseError(500, 'Email SMTP params');
      },
    );
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }

  ctx.status = 201;
  ctx.response.body = {
    message: 'Ok',
  };

  await next();
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.passwordNew = async (ctx, next) => {
  try {
    // найдем пользователя по хэш и удалим хэш (он одноразовый)
    const document = await PasswordReset.findOneAndDelete({ hash: ctx.request.body.hash });
    // const document = await PasswordReset.findOne({ hash: ctx.request.body.hash }, 'userId');

    if (document.userId) {
      // поменяем пароль на новый
      await ctrlUser.setPassword(ctx.request.body.newPassword, document.userId);

      ctx.response.body = {
        message: 'New password set successfully',
      };
    } else {
      throw new ResponseError(403, 'Invalid link');
    }
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }
  await next();
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.signout = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await ctrlToken.deleteKey(ctx.state.user.id);
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
