// Koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const routes = require('./middleware/routes');
const headers = require('./middleware/headers');
// const auth = require('./middleware/auth');

// pasport
const passport = require('koa-passport');

// config
const config = {
  ...require('./config/default.json'),
  ...require('./config/production.json'),
};

// db
require('./models/db');
require('./controllers/passport');

const app = new Koa();

app.use(time);
app.use(error);
app.use(logger());
app.use(bodyParser());
app.use(passport.initialize());
app.use(routes());
app.use(headers);

app.listen(config.node.port);
