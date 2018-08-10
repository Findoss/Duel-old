// Koa
const Koa = require('koa');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

// pasport
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// middleware
const time = require('./middleware/time');
const error = require('./middleware/error');
const routes = require('./middleware/routes');
const headers = require('./middleware/headers');

// config
const config = {
  ...require('./config/default.json'),
  ...require('./config/production.json'),
};

// db
require('./models/db');

const app = new Koa();

app.use(error);
app.use(time);
app.use(bodyParser());
app.use(passport.initialize());
app.use(routes());
app.use(headers);


app.listen(config.node.port);
