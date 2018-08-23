function responseError(code, message) {
  this.name = 'responseError';
  this.code = code || 500;
  this.message = message || 'd';
  this.stack = (new Error()).stack;
}
responseError.prototype = Object.create(Error.prototype);
responseError.prototype.constructor = responseError;
module.exports = responseError;
