const config = require('../../config');

const mongoose = require('mongoose');
const ResponseError = require('../../utils/error');

// controllers
const ctrlToken = require('../../modules/token');
const ctrlUser = require('./user');

// modules
const Authentication = require('../../modules/authentication');

// models
const User = require('../../models/user');
const PasswordReset = require('../../models/password_reset');

// mail
const templater = require('./templater');
const transporterEmail = require('./smtp');
const templetePasswordReset = require('../templates/password_reset.template');

const { ObjectId } = mongoose.Types;

/**
 * TODO описание
 * @param {*}
 */

module.exports.signin = async (ctx) => {
  const user = await Authentication.localStrategy(
    ctx.request.body.email,
    ctx.request.body.password,
  );

  if (user) {
    ctx.response.body = {
      ...user,
      message: 'You are signed in',
    };
  } else {
    throw new ResponseError(403, 'Incorrect username or password');
  }
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
      {
        userId: ObjectId(user.id),
      },
      {
        userId: ObjectId(user.id),
        hash: passwordReset.genHashPasswordReset(),
      },
      { upsert: true, new: true },
    );

    const link = `${config.node.host}password-new/${hashPasswordReset.hash}`;

    // отправим по почте
    // console.log('send mail ', `http://localhost:3002/password-new/${hashPasswordReset.hash}`);

    await new Promise((resolve, reject) => {
      transporterEmail.sendMail(
        {
          from: {
            name: 'Support game Duel',
            address: config.email.address,
          },
          to: ctx.request.body.email,
          subject: 'Please reset your password',
          text: link,
          html: templater.render(templetePasswordReset, { link }),
        },
        (error) => {
          if (error) reject(new Error('Email sent problem'));
          resolve('Ok');
        },
      );
    });

    ctx.status = 201;
    ctx.response.body = {
      message: 'Ok',
    };
  } catch (error) {
    throw new ResponseError(500, 'Email sent problem');
  }
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

    if (document.userId) {
      // меняем пароль на новый
      await ctrlUser.setPassword(document.userId, ctx.request.body.newPassword);

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
  await ctrlToken.deleteKey(ctx.state.user.id);
  ctx.response.body = {
    message: 'You are signed out',
  };
  await next();
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.tokenVerification = async (ctx, next) => {
  if (ctx.header.authorization) {
    const token = ctx.header.authorization.substring(7);
    const user = await Authentication.JWTStrategy(token);

    if (user) {
      ctx.state.user = {
        id: user.id,
        access: user.access,
        gameId: user.gameId,
        nickname: user.nickname,
      };
    } else throw new ResponseError(403, 'Forbidden');
  } else throw new ResponseError(403, 'Forbidden');
  await next();
};
