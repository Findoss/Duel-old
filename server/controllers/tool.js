const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.checkNickname = async function checkNickname(ctx) {
  await User.findOne({ nickname: ctx.query.nickname })
    .then((nickname) => {
      ctx.status = 200;
      ctx.response.body = { used: Boolean(nickname) };
    })
    .catch(() => {
      ctx.status = 400;
      ctx.response.body = {
        message: 'Invalid params',
        code: 'invalid_params',
      };
    });
};

module.exports.checkEmail = async function checkEmail(ctx) {
  await User.findOne({ nickname: ctx.query.email })
    .then((email) => {
      ctx.status = 200;
      ctx.response.body = { used: Boolean(email) };
    })
    .catch(() => {
      ctx.status = 400;
      ctx.response.body = {
        message: 'Invalid params',
        code: 'invalid_params',
      };
    });
};
