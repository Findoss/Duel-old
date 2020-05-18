const Router = require('koa-router');

// controllers
const ctrlMe = require('../controllers/me');

const router = new Router();

router
  .get('/', ctrlMe.getMe)
  .delete('/', ctrlMe.deleteMe)
  .patch('/avatar', ctrlMe.setAvatar)
  .patch('/nickname', ctrlMe.updateNickname)
  .patch('/password', ctrlMe.updatePassword)
  .post('/buyskill', ctrlMe.buySkill)
  .post('/skillset', ctrlMe.addInSkillSet)
  .delete('/skillset', ctrlMe.delInSkillSet);

module.exports = router;
