const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  key: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
