const ResponseError = require('../utils/error');

const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.checkNickname = async (ctx) => {
  await User.findOne({ nickname: ctx.query.nickname }, 'nickname')
    .then((nickname) => {
      ctx.response.body = { used: Boolean(nickname) };
    })
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    });
};

module.exports.checkEmail = async (ctx) => {
  await User.findOne({ nickname: ctx.query.email }, 'email')
    .then((email) => {
      ctx.response.body = { used: Boolean(email) };
    })
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    });
};
