const crypto = require('crypto');
const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

passwordResetSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

passwordResetSchema.set('toObject', {
  getters: true,
  virtuals: true,
});


/**
 * TODO описание
 * @param {*}
 */
passwordResetSchema.methods.genHashPasswordReset = function genHashPasswordReset() {
  const solt = crypto.randomBytes(4).toString('hex');
  const solt2 = crypto.randomBytes(16).toString('hex');
  return crypto.pbkdf2Sync(solt, solt2, 128, 64, 'sha256').toString('hex');
};

/**
 * TODO описание
 * @param {*}
 */
passwordResetSchema.methods.checkHashPasswordReset = function checkHashPasswordReset(hash) {
  return this.hash === hash;
};

module.exports = mongoose.model('passwordReset', passwordResetSchema);
