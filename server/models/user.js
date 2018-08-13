const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  gold: {
    type: Number,
    default: 0,
    min: 0,
    max: 99,
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
    max: 10,
  },
  experience: {
    type: Number,
    default: 0,
  },
  limitSlots: {
    type: Number,
    default: 1,
    min: 0,
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
    type: [Number],
  },
  skillsUnlocked: {
    type: [Number],
  },
}, {
  // toJSON: {
  //   virtuals: true,
  // },
});

// userSchema.virtual('level')
//   .get(function () {
//     return (this.experience + 1) * 50;
//   });

const User = mongoose.model('User', userSchema);
module.exports = User;
