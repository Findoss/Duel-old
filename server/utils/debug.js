const config = require('../config');

/**
 * TODO описание
 * @param {*} code
 * @param {*} message
 */
module.exports.chat = (socket, data) => {
  if (config.logger.game) {
    socket.emit('Chat', data);
  }
};
/**
 * TODO описание
 * @param {*} code
 * @param {*} message
 */
module.exports.log = (data) => {
  if (config.logger.game) {
    if (data) {
      console.log(data);
    }
  }
};
