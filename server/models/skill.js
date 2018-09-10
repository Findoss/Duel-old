const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'null',
  },
  author: {
    type: String,
    default: 'null',
  },
  description: {
    type: String,
    default: 'null',
  },
  duration: {
    type: Number,
    default: 1,
  },
  changeTurn: {
    type: Boolean,
    required: true,
  },
  cooldown: {
    type: Number,
    default: 1,
  },
  triggeringEvent: {
    type: String,
    default: 'null',
  },
  resources: {
    type: Object,
  },
  points: {
    type: Number,
    default: 1,
  },
  priceInGold: {
    type: Number,
    default: 1,
  },
  minLevel: {
    type: Number,
    default: 1,
  },
  limitCopy: {
    type: Number,
    default: 1,
  },
  modifiers: {
    type: Object,
  },
}, {
  id: false,
});


module.exports = mongoose.model('Skill', skillSchema);
