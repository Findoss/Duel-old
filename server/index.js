const Koa = require('koa');

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose'); // стандартная прослойка для работы с MongoDB
const crypto = require('crypto');

// middleware
const time = require('./middleware/time');
const err = require('./middleware/error');
const routes = require('./middleware/routes');

// config
const config = {
  ...require('./config/default.json'),
  ...require('./config/production.json')
};

const app = new Koa();

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

app.use(err);
app.use(time);
app.use(passport.initialize());
app.use(routes());

// response
app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(config.node.port);