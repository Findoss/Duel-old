const config = require('../config/index');

const User = require('../models/user');
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
    const user = await User.findOne({ email }, 'nickname password');
    if (user) {
      if (user.password === password) {
        const token = await Token.generateToken(user.id);

        if (token) {
          return done(null, {
            id: user.id,
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
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWTKey || 'JWTKey',
    // jsonWebTokenOptions: {
    //   maxAge: '20s',
    // },
  },
  (async (user, done) => {
    if (user) {
      const isCurrentSession = await Token.checkKey(user.id, user.key);

      if (isCurrentSession) return done(null, user);
      return done(null, false);
    } return done(null, false);
  }),
));
