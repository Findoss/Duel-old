const Router = require('koa-router');

// controllers
const ctrlSkill = require('../../controllers/skills');


const router = new Router();

router
  .get('/', ctrlSkill.getSkills)
  .get('/:id', ctrlSkill.getSkill);

module.exports = router;
