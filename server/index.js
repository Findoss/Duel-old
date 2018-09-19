const config = require('./config/index');

// Koa
const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const client = require('koa-static');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const routes = require('./middleware/routes/index.js');
const headers = require('./middleware/headers');
const passport = require('koa-passport');
const loggerBody = require('./middleware/loggerBody');

// db
const mongoose = require('mongoose');
require('./db');
require('./controllers/passport');

async function createApp() {
  const app = new Koa();

  app.use(client('../client/build'));
  app.use(time);
  app.use(cors());
  app.use(headers);
  if (config.logger.koa) app.use(logger());
  app.use(error);
  app.use(bodyParser());
  if (config.logger.koa) app.use(loggerBody);
  app.use(passport.initialize());
  app.use(routes());

  await mongoose.connect(
    `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
    { useNewUrlParser: true },
  );

  const server = await app.listen(config.node.port);
  if (config.logger.node) console.log(`[server  ] start - ${config.node.host}:${config.node.port}`);

  return server;
}

if (!module.parent) {
  createApp();
}

module.exports = createApp;
