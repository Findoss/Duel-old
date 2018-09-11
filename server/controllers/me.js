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
  const user = await User.findById(ctx.state.user.id, 'gold experience level');
  const skill = await Skill.findById(ctx.request.body.id, 'priceInGold minLevel');

  if (
    user.level >= skill.minLevel &&
    user.gold >= skill.priceInGold
  ) {
    await User
      .findByIdAndUpdate(
        ctx.state.user.id,
        {
          $set: { gold: user.gold - skill.priceInGold },
          $push: { skillsUnlocked: ctx.request.body.id },
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
  const user = await User.findById(ctx.state.user.id, 'points skillsUnlocked openSlots skillSet');
  const skill = await Skill.findById(ctx.request.body.id, 'points limitCopy');

  const availableSlots = user.openSlots - user.skillSet.length;
  const isBoughtSkills = user.skillsUnlocked.some(unlocked => skill.id === unlocked);

  // количество доступных слотов больше или равно 1
  // console.log(availableSlots >= 1);

  // количество свободных очков игрока больше или равно количеству очков умения
  // console.log(user.points >= skill.points);

  // скилл куплен
  // console.log(isBoughtSkills);

  // умение не превышает лимит на копии
  // console.log(skill.limitCopy >= user.skillSet.filter(id => id === skill.id).length + 1);

  if (
    availableSlots >= 1 &&
    user.points >= skill.points &&
    isBoughtSkills &&
    skill.limitCopy >= user.skillSet.filter(id => id === skill.id).length + 1
  ) {
    await User
      .findByIdAndUpdate(
        ctx.state.user.id,
        {
          $set: { points: user.points - skill.points },
          $push: { skillSet: ctx.request.body.id },
        },
      )
      .catch(() => {
        throw new ResponseError(500, 'DB error');
      })
      .then(() => {
        ctx.response.body = { message: 'Your set of skills is updated successfully' };
      });
  } else throw new ResponseError(400, 'ne prosho validat');
};

module.exports.delManyInSkillSet = async (ctx) => {
  const user = await User.findById(ctx.state.user.id, 'points skillSet');
  const skill = await Skill.findById(ctx.request.body.id, 'points');

  if (
    user.skillSet.some(id => id === ctx.request.body.id)
  ) {
    await User
      .findByIdAndUpdate(
        ctx.state.user.id,
        {
          $set: { points: user.points + skill.points },
          $pull: { skillSet: ctx.request.body.id },
        },
      )
      .catch(() => {
        throw new ResponseError(500, 'DB error');
      })
      .then(() => {
        ctx.response.body = { message: 'Your skills of set is delete successfully' };
      });
  } else throw new ResponseError(400, 'ne prosho validat');
};
