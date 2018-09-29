const config = require('./config/index');

// Koa
const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static');
const helmet = require('koa-helmet');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const logger = require('./middleware/logger');
const routes = require('./middleware/routes');
const headers = require('./middleware/headers');
const sendIndex = require('./middleware/sendIndex');

// db
const mongoose = require('mongoose');
require('./db');
require('./controllers/passport');

async function createApp() {
  const app = new Koa();

  //  REQ   RES
  //   ↓     ↑
  app.use(time());
  //   ↓     ↑
  //   ↓     ↑--------------------------←
  //   ↓                                ↑
  app.use(cors());//                    ↑
  //   ↓                                ↑
  app.use(helmet());//                  ↑
  //   ↓                                ↑
  app.use(headers());//                 ↑
  //   ↓                                ↑
  app.use(passport.initialize());//     ↑
  //   ↓                                ↑
  app.use(bodyParser());//              ↑
  //   ↓                                ↑
  //   ↓     →--------------------------↑
  //   ↓     ↑
  app.use(logger());
  //   ↓     ↑
  app.use(error());
  //   ↓     ↑
  //   ↓     ↑--------------------------←
  //   ↓                                ↑
  app.use(serve('../client/build/'));// ↑
  //  err    ok                         ↑
  //   ↓     →--------------------------↑
  //   ↓                                ↑
  app.use(routes.routes());//           ↑
  //  err    ok                         ↑
  //   ↓     →--------------------------↑
  //   ↓                                ↑
  app.use(sendIndex());//               ↑
  //   ↓                                ↑
  //   →--------------------------------↑


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
