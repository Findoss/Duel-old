/**
 * TODO описание
 */

/**
 *
 * @class
 */
class Timer {
  /**
   * @constructor
   * @param {Array} users Имена игроков (между кем будет меняться ход)
   */
  constructor(func, time, ctx, ...args) {
    this.func = func;
    this.time = time;
    this.ctx = ctx;
    this.args = args;
  }

  stop() {
    if (this.idTimer) {
      clearInterval(this.idTimer);
      this.idTimer = null;
    }
    return this;
  }

  start() {
    if (!this.idTimer) {
      this.stop();
      this.idTimer = setInterval(this.func, this.time, this.ctx, this.args);
    }
    return this;
  }

  reset(newTime = this.time) {
    this.time = newTime;
    return this.stop().start();
  }
}

module.exports = Timer;
