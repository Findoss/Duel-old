const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();


const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    index: true,
  },
  key: {
    type: String,
    required: true,
  },
});

sessionSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

sessionSchema.set('toObject', {
  getters: true,
  virtuals: true,
});

sessionSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Session', sessionSchema);
