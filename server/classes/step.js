/**
 * @class
 */
class Step {
  /**
   * @constructor
   */
  constructor(players) {
    this.names = [
      players[0].name,
      players[1].name
    ];

    this.step = this.coinToss();
  }

  isStep(name) {
    return this.step === name;
  }

  getStep() {
    return this.step;
  }

  nextStep(chance = 0) {
    if (this.step === this.names[0]) {
      this.step = this.names[1];
    } else {
      this.step = this.names[0];
    }
    return this.step;
  }

  coinToss() {
    if (Math.floor(Math.random() * 2) === 0) {
      return this.names[0];
    } else {
      return this.names[1];
    }
  }
}

module.exports = Step;
