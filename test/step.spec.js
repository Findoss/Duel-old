/* globals describe, it */

const mocha = require('mocha');
const { expect } = require('chai');

const SeedRandom = require('seedrandom');
const Step = require('../server/classes/step.js');

const step = new Step('alibaba', 'muhamed');

describe('Step', () => {
  //
  it('coinToss', () => {
    // random1 = 1
    const random1 = new SeedRandom('seed');
    const result1 = step.coinToss(random1);
    expect(result1).to.equal('muhamed');

    // random2 = 0
    const random2 = new SeedRandom('seed-1234567');
    const result2 = step.coinToss(random2);
    expect(result2).to.equal('alibaba');
  });

  it('getStep', () => {
    const result = step.getStep();
    expect(result).to.equal('alibaba');
  });

  it('isStep', () => {
    const result1 = step.isStep('alibaba');
    const result2 = step.isStep('alibaba2');
    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });

  it('nextStep ', () => {
    // alibaba
    const random1 = new SeedRandom('seed');

    const result1 = step.nextStep(random1);
    expect(result1).to.equal('muhamed');

    const result2 = step.nextStep(random1, 10);
    expect(result2).to.equal('alibaba');

    const result3 = step.nextStep(random1, 99);
    expect(result3).to.equal('alibaba');
  });
});
