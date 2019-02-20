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
    this.time = time + 1000;
    this.ctx = ctx;
    this.args = args;
    this.currentTime = this.time;
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
      this.currentTime = this.time;
      this.idTimer = setInterval(() => { this.step(); }, 1000);
    }
    return this;
  }

  reset(newTime = this.time) {
    this.time = newTime;
    return this.stop().start();
  }

  step() {
    this.currentTime -= 1000;
    if (this.currentTime <= 0) {
      this.func(this.ctx, this.args);
    }
    return this;
  }

  getCurrentTime() {
    return this.currentTime;
  }
}

module.exports = Timer;
