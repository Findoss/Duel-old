const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const gameSchema = new mongoose.Schema({
  userOneId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userTwoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  solt: {
    type: String,
    required: true,
  },
  steps: {
    // type: [Object],
  },
  result: {
    type: Object,
  },
});

gameSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

gameSchema.set('toObject', {
  getters: true,
  virtuals: true,
});

gameSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Game', gameSchema);
