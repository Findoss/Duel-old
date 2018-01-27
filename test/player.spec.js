/* globals describe, it */

const mocha = require('mocha');
const { expect } = require('chai');

const Player = require('../server/classes/player.js');

const player = new Player();

describe('Player', () => {
  //
  it('getHp', () => {
    const result = player.getHp();
    expect(result).to.equal(150);
  });

  it('isLife', () => {
    // this.hp.value = 150
    const result = player.isLife();
    expect(result).to.be.true;
  });

  describe('setHp', () => {
    it('setHp in renge', () => {
      // this.hp.value = 150
      const result1 = player.setHp(-70);
      expect(result1).to.equal(80);
      // this.hp.value = 80
      const result2 = player.setHp(50);
      expect(result2).to.equal(130);
    });

    it('setHp out renge', () => {
      // this.hp.value = 130
      const result1 = player.setHp(100);
      expect(result1).to.equal(150);
      // this.hp.value = 150
      const result2 = player.setHp(-300);
      expect(result2).to.equal(0);
    });
  });
});
