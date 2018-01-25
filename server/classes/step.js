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

  coinToss(random) {
    if (Math.floor(random() * 2) === 0) {
      this.step = this.names[0];
    }
    this.step = this.names[1];
    return this.step;
  }
}

module.exports = Step;
