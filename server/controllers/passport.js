const config = {
  ...require('../config/default.json'),
  ...require('../config/production.json'),
};

const User = require('../models/user');
const Session = require('../models/session');

const Token = require('./token');

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  (async (email, password, done) => {
    const user = await User.findOne({ email }, '_id nickname password');
    if (user) {
      if (user.password === password) {
        const token = await Token.generateToken(user._id);

        if (token) {
          return done(null, {
            id: user._id,
            token,
          });
        }
        return done(null, false);
      } return done(null, false);
    } return done(null, false);
  }),
));


passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('token'),
    secretOrKey: config.JWTKey,
    // jsonWebTokenOptions: {
    //   maxAge: '20s',
    // },
  },
  (async (payload, done) => {
    if (payload) {
      const isCurrentSession = await Token.checkKey(payload);

      if (isCurrentSession) return done(null, payload);
      return done(null, false);
    } return done(null, false);
  }),
));
