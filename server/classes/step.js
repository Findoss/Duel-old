/**
 * @class
 */
class Step {
  /**
   * @constructor
   */
  constructor() {
    //
    this.step = Step.coinToss();
  }

  getStep() {
    return this.step;
  }

  nextStep() {
    return this.step = !this.step;
  }

  static coinToss() {
    return (Math.floor(Math.random() * 2) === 0);
  }
}

module.exports = Step;
