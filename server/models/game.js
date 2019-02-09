const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

// TODO пользователей объединить в массив
const gameSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
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
    default: null,
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
