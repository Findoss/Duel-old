const config = require('./config/index');

// Koa
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const routes = require('./middleware/routes/index.js');
const headers = require('./middleware/headers');
const passport = require('koa-passport');

// db
const mongoose = require('mongoose');
require('./models/db');
require('./controllers/passport');

async function createApp() {
  const app = new Koa();

  app.use(time);
  if (config.logger.koa) app.use(logger());
  app.use(error);
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(routes());
  app.use(headers);

  await mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
    { useNewUrlParser: true },
  );

  const server = await app.listen(config.node.port);
  if (config.logger.node) console.log(`[server  ] start - ${config.node.host}:${config.node.port}`);

  return server;
}

if (!module.parent) {
  // createApp().listen(config.node.port);
  createApp();
}

module.exports = createApp;
