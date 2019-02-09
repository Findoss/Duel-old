const ResponseError = require('../../utils/error');
const User = require('../../models/user');

/**
 * TODO описание
 * @param {*}
 */
module.exports.userCreate = async (ctx) => {
  try {
    const newUser = new User();
    newUser.nickname = ctx.request.body.nickname;
    newUser.email = ctx.request.body.email.toLowerCase();
    newUser.setPassword(ctx.request.body.password);

    const user = await newUser.save();

    ctx.status = 201;
    ctx.response.body = {
      id: user.id,
      nickname: user.nickname,
      message: 'Accaunt has been created',
    };
  } catch (error) {
    throw new ResponseError(400, 'Invalid user param');
  }
};

/**
 * TODO описание
 * @param {*}
 */
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
    throw error;
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.getUser = async (ctx) => {
  try {
    const user = await User
      .findById(
        ctx.params.id,
        'nickname avatar rank experience level karma openSlots skillSet',
      );

    if (user) {
      // TODO вернуть поля с помощью плагина скрывающего поля
      ctx.response.body = {
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
    throw error;
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.setPassword = async (userId, newPassword) => {
  // TODO валидация
  try {
    const user = await User.findById(userId);
    await user.setPassword(newPassword);
    await user.save();
    return true;
  } catch (error) {
    throw new ResponseError(523, error);
  }
};
