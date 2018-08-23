const config = require('./config/index');

// Koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const routes = require('./middleware/routes/index.js');
const headers = require('./middleware/headers');
const passport = require('koa-passport');

// db
require('./models/db');
require('./controllers/passport');

function createApp() {
  const app = new Koa();

  app.use(time);
  app.use(error);
  app.use(logger());
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(routes());
  app.use(headers);

  return app;
}

if (!module.parent) {
  createApp().listen(config.node.port);
}

module.exports = createApp;
