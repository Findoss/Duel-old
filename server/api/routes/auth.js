const Router = require('koa-router');
const ctrlSession = require('../controllers/session');

const router = new Router();

router
  .post('/signin', ctrlSession.signin)
  .post('/password-reset', ctrlSession.passwordReset)
  .post('/password-new', ctrlSession.passwordNew)
  .post('/signin', ctrlSession.signin)
  .delete('/signout', ctrlSession.tokenVerification, ctrlSession.signout);

module.exports = router;
