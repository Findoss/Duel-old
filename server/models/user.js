const mongoose = require('mongoose');
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
  },
  email: {
    type: String,
    default: 'email',
    unique: true,
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
    type: String,
    required: true,
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
}, {
  id: false,
  toJSON: {
    virtuals: true,
  },
});

userSchema.virtual('level').get(function () {
  const level = Levels.findIndex(experience => this.experience < experience);
  return level;
});

// userSchema.methods.checkPassword = function (password) {
//   if (!password) return false;
//   if (!this.passwordHash) return false;
//   return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
// };

module.exports = mongoose.model('User', userSchema);
