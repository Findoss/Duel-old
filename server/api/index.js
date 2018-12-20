const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const passport = require('koa-passport');
const serve = require('koa-static');

// API middleware
const error = require('./middleware/error');
const headers = require('./middleware/headers');
const logger = require('./middleware/logger');
const sendIndex = require('./middleware/sendIndex');
const time = require('./middleware/time');
const locales = require('./middleware/locales');
const routes = require('./routes');

// Client files
const PATH_CLIENT = '../client/build/';

// Passport starrtegy
require('./controllers/passport');

const app = new Koa();

//  REQ   RES
//   ↓     ↑
app.use(time());
//   ↓     ↑
//   ↓     ↑-----------------------←
//   ↓                             ↑
app.use(cors());//                 ↑
//   ↓                             ↑
app.use(helmet());//               ↑
//   ↓                             ↑
app.use(headers());//              ↑
//   ↓                             ↑
app.use(locales());//              ↑
//   ↓                             ↑
app.use(passport.initialize());//  ↑
//   ↓                             ↑
app.use(bodyParser());//           ↑
//   ↓                             ↑
//   ↓     →---------------------- ↑
//   ↓     ↑
app.use(logger());
//   ↓     ↑
app.use(error());
//   ↓     ↑
//   ↓     ↑-----------------------←
//   ↓                             ↑
app.use(serve(PATH_CLIENT));//     ↑
//  err    ok                      ↑
//   ↓     →-----------------------↑
//   ↓                             ↑
app.use(routes.routes());//        ↑
//  err    ok                      ↑
//   ↓     →-----------------------↑
//   ↓                             ↑
app.use(sendIndex(PATH_CLIENT));// ↑
//   ↓                             ↑
//   →-----------------------------↑

module.exports = app;
