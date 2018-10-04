const crypto = require('crypto');
const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const Levels = require('../static/levels.json');

const userSchema = new mongoose.Schema({
  gold: {
    type: Number,
    default: 0,
    min: 0,
    max: 99999,
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
    max: 99,
  },
  avatar: {
    type: String,
    default: 'null',
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  karma: {
    type: Number,
    default: 1,
    min: 0,
    max: 999,
  },
  experience: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 1200,
  },
  limitSlots: {
    type: Number,
    default: 8,
    min: 1,
    max: 8,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    salt: {
      type: String,
    },
    hash: {
      type: String,
    },
  },
  openSlots: {
    type: Number,
    default: 3,
    min: 1,
    max: 8,
  },
  skillSet: {
    type: [String],
  },
  skillsUnlocked: {
    type: [String],
  },
});
userSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});
userSchema.set('toObject', {
  getters: true,
  virtuals: true,
});

userSchema.virtual('level')
  .get(function () {
    const level = Levels.findIndex(experience => this.experience < experience);
    return level;
  });

userSchema.plugin(mongooseHidden);

userSchema.methods.setPassword = function (password) {
  this.password.salt = crypto.randomBytes(16).toString('hex');
  this.password.hash = crypto.pbkdf2Sync(password, this.password.salt, 128, 64, 'sha256').toString('hex');
};

userSchema.methods.checkPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.password.salt, 128, 64, 'sha256').toString('hex');
  return this.password.hash === hash;
};

module.exports = mongoose.model('User', userSchema);
