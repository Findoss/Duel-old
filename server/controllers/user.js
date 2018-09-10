const ResponseError = require('../utils/error');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.userCreate = async (ctx) => {
  await User.create(ctx.request.body)
    .then(() => {
      ctx.status = 201;
      ctx.response.body = {
        message: 'Accaunt has been created',
      };
    })
    .catch(() => {
      throw new ResponseError(400, 'Invalid user params');
    });
};

module.exports.getUsers = async (ctx) => {
  await User
    .find(
      {},
      'nickname avatar rank experience level',
      {
        sort: { experience: -1 },
        skip: Number(ctx.query.skip) || 0,
        limit: Number(ctx.query.limit) || 10,
      },
    )
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    })
    .then((users) => {
      if (users.length !== 0) {
        ctx.response.body = users;
      } else throw new ResponseError(404, 'Users with id not found');
    });
};

module.exports.getUser = async (ctx) => {
  await User
    .findById(
      ctx.params.id,
      'nickname avatar rank experience level karma openSlots skillSet',
    )
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    })
    .then((user) => {
      if (user) {
        ctx.response.body = {
          _id: user._id,
          nickname: user.nickname,
          avatar: user.avatar,
          rank: user.rank,
          level: user.level,
          karma: user.karma,
          openSlots: user.openSlots,
          skillSet: user.skillSet,
        };
      } else throw new ResponseError(404, 'User with id not found');
    });
};
