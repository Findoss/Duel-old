const ResponseError = require('../utils/error');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.userCreate = async (ctx) => {
  try {
    await User
      .create(ctx.request.body)
      .then(() => {
        ctx.status = 201;
        ctx.response.body = {
          message: 'Accaunt has been created',
        };
      });
  } catch (error) {
    throw new ResponseError(400, 'Invalid user params');
  }
};

module.exports.getUsers = async (ctx) => {
  try {
    const users = await User
      .find(
        {},
        'nickname avatar rank experience level',
        {
          sort: { rank: -1 },
          skip: Number(ctx.query.skip) || 0,
          limit: Number(ctx.query.limit) || 10,
        },
      );
    if (users.length !== 0) ctx.response.body = users;
    else throw new ResponseError(404, 'Users with id not found');
  } catch (error) {
    if (error.name !== 'responseError') throw new ResponseError(400, 'Invalid params');
  }
};

module.exports.getUser = async (ctx) => {
  try {
    const user = await User
      .findById(
        ctx.params.id,
        'nickname avatar rank experience level karma openSlots skillSet',
      );
    if (user) {
      ctx.response.body = { // todo . вернуть поля с помощью плагина скрывающего поля
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        rank: user.rank,
        level: user.level,
        karma: user.karma,
        openSlots: user.openSlots,
        skillSet: user.skillSet,
      };
    } else throw new ResponseError(404, 'User with id not found');
  } catch (error) {
    if (error.name !== 'responseError') throw new ResponseError(400, 'Invalid params');
  }
};
