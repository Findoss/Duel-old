const ResponseError = require('../utils/error');
const mongoose = require('mongoose');
const Skill = require('../models/skill');


module.exports.getSkills = async (ctx) => {
  await Skill
    .find(
      {},
      '',
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
      if (users.length !== 0) ctx.response.body = users;
      else throw new ResponseError(404, 'Skills with id not found');
    });
};

module.exports.getSkill = async (ctx) => {
  await Skill
    .findById(ctx.params.id)
    .catch(() => {
      throw new ResponseError(400, 'Invalid params');
    })
    .then((user) => {
      if (user) ctx.response.body = user;
      else throw new ResponseError(404, 'Skill with id not found');
    });
};
