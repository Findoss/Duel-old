/* globals describe, it */

const mocha = require('mocha');
const { expect } = require('chai');

const SeedRandom = require('seedrandom');
const Step = require('../server/classes/step.js');

const random = new SeedRandom('random');
const step = new Step('alibaba', 'muhamed');

describe('Step', () => {
  //
  it('coinToss', () => {
    // result random 0
    const result = step.coinToss(random);
    expect(result).to.equal('alibaba');
  });

  it('isStep', () => {
    const result1 = step.isStep('alibaba');
    const result2 = step.isStep('alibaba2');
    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });

  it('nextStep', () => {
    const result = step.nextStep('alibaba');
    expect(result).to.equal('muhamed');
  });

  it('getStep', () => {
    const result = step.getStep();
    expect(result).to.equal('muhamed');
  });
});
