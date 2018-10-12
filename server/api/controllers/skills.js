const ResponseError = require('../../utils/error');
const mongoose = require('mongoose');
const Skill = require('../../models/skill');


module.exports.getSkills = async (ctx) => {
  try {
    const skills = await Skill
      .find(
        {}, '',
        {
          skip: Number(ctx.query.skip) || 0,
          limit: Number(ctx.query.limit) || 10,
        },
      );
    if (skills.length !== 0) ctx.response.body = skills;
    else throw new ResponseError(404, 'Skills with id not found');
  } catch (error) {
    if (error.name !== 'responseError') throw new ResponseError(400, 'Invalid params');
  }
};

module.exports.getSkill = async (ctx) => {
  try {
    const skill = await Skill.findById(ctx.params.id);
    if (skill) ctx.response.body = skill;
    else throw new ResponseError(404, 'Skill with id not found');
  } catch (error) {
    if (error.name !== 'responseError') throw new ResponseError(400, 'Invalid params');
  }
};
