const ResponseError = require('../utils/error');
const mongoose = require('mongoose');
const User = require('../models/user');
const Skill = require('../models/skill');
const Session = require('../models/session');

const avatars = require('../static/avatars.json');

module.exports.getMe = async (ctx) => {
  await User
    .findById(ctx.state.user.id)
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    })
    .then((user) => {
      if (user) ctx.response.body = user;
      else throw new ResponseError(404, 'User with id not found');
    });
};

module.exports.deleteMe = async (ctx) => {
  await Session
    .findByIdAndRemove(ctx.state.user.id)
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    });

  await User
    .findByIdAndRemove(ctx.state.user.id)
    .then(() => {
      ctx.response.body = { message: 'Your accaunt is successfully deleted' };
    });
};

module.exports.setAvatar = async (ctx) => {
  if (!avatars.some(avatar => avatar === ctx.request.body.avatar)) throw new ResponseError(400, 'Invalid params');

  await User
    .findByIdAndUpdate(
      ctx.state.user.id,
      ctx.request.body,
    )
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    })
    .then(() => {
      ctx.response.body = { message: 'Your avatar is updated successfully' };
    });
};

module.exports.setNickname = async (ctx) => {
  /*
  * todo validation
  */

  await User
    .findByIdAndUpdate(
      ctx.state.user.id,
      ctx.request.body,
    )
    .catch(() => {
      throw new ResponseError(400, 'Nickname exists');
    })
    .then(() => {
      ctx.response.body = { message: 'Your nickname is updated successfully' };
    });
};

module.exports.setPassword = async (ctx) => {
  /*
  * todo validation
  */

  await User
    .findByIdAndUpdate(
      ctx.state.user.id,
      ctx.request.body,
    )
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    })
    .then(() => {
      ctx.response.body = { message: 'New password set successfully' };
    });
};

module.exports.buySkill = async (ctx) => {
  const skill = await Skill.findById(ctx.request.body.id, 'priceInGold minLevel');
  const user = await User.findById(ctx.state.user.id, 'gold experience level');

  if (
    user.level >= skill.minLevel &&
    user.gold >= skill.priceInGold
  ) {
    await User
      .findByIdAndUpdate(
        ctx.state.user.id,
        {
          $set: { gold: user.gold - skill.priceInGold },
          $push: { skillsUnlocked: skill._id },
        },
      )
      .catch(() => {
        throw new ResponseError(400, 'Invalid params');
      })
      .then(() => {
        ctx.response.body = { message: 'Your skill unlocked' };
      });
  } else throw new ResponseError(400, 'Not enough money or level');
};

module.exports.addManyInSkillSet = async (ctx) => {
  function getCountClones(array, id) {
    return array.filter(item => item === id).length;
  }

  const skills = await Skill.find({ _id: ctx.request.body }, 'points limitCopy');
  const user = await User.findById(ctx.state.user.id, 'points skillsUnlocked openSlots skillSet');

  const sumPointSkills = ctx.request.body.reduce((acc, id) => {
    const { points } = skills.find(skill => String(skill._id) === id);
    return acc + points;
  }, 0);

  const isCloneLimits = ctx.request.body.every((id) => {
    const { limitCopy } = skills.find(skill => String(skill._id) === id);
    return getCountClones(skills, id) + getCountClones(user.skillSet, id) <= limitCopy;
  });

  const isBoughtSkills = ctx.request.body.every(id => user.skillsUnlocked.some(idUnlocked => String(idUnlocked) === id));

  const availableSlots = user.openSlots - user.skillSet.length;

  if (
    // количество добавляемых умений меньше или равно количества доступных слотов
    ctx.request.body.length <= availableSlots &&
    // сумарное количество очков добавляемых умений меньше или равно  свободных очков игрока
    sumPointSkills <= user.points &&
    // каждый скилл куплен
    isBoughtSkills &&
    // количество одинаковых добавляемых умений меньше лимита на копии
    isCloneLimits
  ) {
    await User
      .findByIdAndUpdate(
        ctx.state.user.id,
        {
          $set: { points: user.points - sumPointSkills },
          $push: { skillSet: ctx.request.body },
        },
      )
      .catch((e) => {
        throw new ResponseError(500, e);
      })
      .then(() => {
        ctx.response.body = { message: 'Your set of skills is updated successfully' };
      });
  } else throw new ResponseError(400, 'ne prosho validat');
};

module.exports.delManyInSkillSet = async (ctx) => {
  const skills = await Skill.find({ _id: ctx.request.body }, 'points');
  const user = await User.findById(ctx.state.user.id, 'points skillSet');

  const sumPointSkills = ctx.request.body.reduce((acc, id) => {
    const { points } = skills.find(skill => String(skill._id) === id);
    return acc + points;
  }, 0);

  await User
    .findByIdAndUpdate(
      ctx.state.user.id,
      {
        $set: { points: user.points + sumPointSkills },
        $pullAll: { skillSet: ctx.request.body },
      },
    )
    .catch((e) => {
      throw new ResponseError(501, e);
    })
    .then(() => {
      ctx.response.body = { message: 'Your skills of set is delete successfully' };
    });
};
