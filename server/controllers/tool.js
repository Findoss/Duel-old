const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.checkNickname = async (ctx) => {
  await User.findOne({ nickname: ctx.query.nickname }, 'nickname')
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

module.exports.checkEmail = async (ctx) => {
  await User.findOne({ nickname: ctx.query.email }, 'email')
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
