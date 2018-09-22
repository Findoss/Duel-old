const config = require('./config/index');

// Koa
const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static');
const logger = require('koa-logger');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const routes = require('./middleware/routes/index.js');
const headers = require('./middleware/headers');
const sendIndex = require('./middleware/sendIndex');
const loggerBody = require('./middleware/loggerBody');

// db
const mongoose = require('mongoose');
require('./db');
require('./controllers/passport');

async function createApp() {
  const app = new Koa();

  app.use(error);
  app.use(time);
  app.use(cors());
  app.use(headers);
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(serve('../client/build/'));
  app.use(routes.routes());
  app.use(sendIndex);
  if (config.logger.koa) app.use(logger());
  if (config.logger.koa) app.use(loggerBody);


  await mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
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
