const mongoose = require('mongoose');

const ResponseError = require('../../utils/error');
const User = require('../../models/user');
const Skill = require('../../models/skill');
const Session = require('../../models/session');

const { ObjectId } = mongoose.Types;

const ctrlUser = require('./user');

const avatars = require('../../static/avatars.json');

/**
 * TODO описание
 * @param {*}
 */
module.exports.passwordVerification = async (id, password) => {
  try {
    const user = await User.findById(id);
    return await user.checkPassword(password);
  } catch (error) {
    throw new ResponseError(500, error);
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.getMe = async (ctx) => {
  try {
    const user = await User.findById(ctx.state.user.id, '-password');
    if (user) ctx.response.body = user;
    else throw new ResponseError(404, 'User with id not found');
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.deleteMe = async (ctx) => {
  try {
    Session.remove({
      userId: ObjectId(ctx.state.user.id),
    });
    User.findByIdAndRemove(ctx.state.user.id);

    ctx.response.body = { message: 'Your accaunt is successfully deleted' };
  } catch (error) {
    throw new ResponseError(500, error);
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.setAvatar = async (ctx) => {
  if (!avatars.some(avatar => avatar === ctx.request.body.avatar)) throw new ResponseError(400, 'Invalid params');
  try {
    await User.findByIdAndUpdate(
      ctx.state.user.id,
      ctx.request.body,
    );
    ctx.response.body = { message: 'Your avatar is updated successfully' };
  } catch (error) {
    throw new ResponseError(400, 'Invalid params');
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.updateNickname = async (ctx) => {
  // TODO валидация

  try {
    await User.findByIdAndUpdate(
      ctx.state.user.id,
      ctx.request.body,
    );

    ctx.response.body = { message: 'Your nickname is updated successfully' };
  } catch (error) {
    throw new ResponseError(400, 'Nickname exists');
  }
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.updatePassword = async (ctx) => {
  const isTruePassword = await this.passwordVerification(
    ctx.state.user.id,
    ctx.request.body.oldPassword,
  );

  if (isTruePassword) {
    const result = await ctrlUser.setPassword(ctx.state.user.id, ctx.request.body.newPassword);
    if (result) {
      ctx.response.body = {
        message: 'Your password is updated successfully',
      };
    } else {
      throw new ResponseError(400, 'Incorrect params');
    }
  } else throw new ResponseError(403, 'Incorrect password');
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.buySkill = async (ctx) => {
  const user = await User.findById(ctx.state.user.id, 'gold experience level');
  const skill = await Skill.findById(ctx.request.body.id, 'priceInGold minLevel');

  if (
    user.level >= skill.minLevel &&
    user.gold >= skill.priceInGold
  ) {
    try {
      await User
        .findByIdAndUpdate(
          ctx.state.user.id,
          {
            $set: { gold: user.gold - skill.priceInGold },
            $push: { skillsUnlocked: ctx.request.body.id },
          },
        );
      ctx.response.body = { message: 'Your skill unlocked' };
    } catch (error) {
      throw new ResponseError(400, 'Invalid params');
    }
  } else throw new ResponseError(400, 'Not enough money or level');
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.addInSkillSet = async (ctx) => {
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
    try {
      await User
        .findByIdAndUpdate(
          ctx.state.user.id,
          {
            $set: { points: user.points - skill.points },
            $push: { skillSet: ctx.request.body.id },
          },
        );

      ctx.response.body = { message: 'Your set of skills is updated successfully' };
    } catch (error) {
      throw new ResponseError(500, error);
    }
  } else throw new ResponseError(400, 'ne prosho validat');
};

/**
 * TODO описание
 * @param {*}
 */
module.exports.delInSkillSet = async (ctx) => {
  const user = await User.findById(ctx.state.user.id, 'points skillSet');
  const skill = await Skill.findById(ctx.request.body.id, 'points');

  if (
    user.skillSet.some(id => id === ctx.request.body.id)
  ) {
    try {
      User.findOneAndUpdate(
        {
          _id: ObjectId(ctx.state.user.id),
          skillSet: ctx.request.body.id,
        },
        {
          $unset: { 'skillSet.$': '' },
        },
      );

      User
        .findByIdAndUpdate(
          ctx.state.user.id,
          {
            $set: { points: user.points + skill.points },
            $pull: { skillSet: null },
          },
        );

      ctx.response.body = { message: 'Your skills of set is delete successfully' };
    } catch (error) {
      throw new ResponseError(500, error);
    }
  } else throw new ResponseError(400, 'ne prosho validat');
};
