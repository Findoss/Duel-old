/* globals describe, it */

const mocha = require('mocha');
const { expect } = require('chai');

const Changes = require('../server/classes/changes.js');

const changes = new Changes();

describe('Changes', () => {
  //
  it('add', () => {
    const testEvent = 'Drag';
    const testData = {x:5, y:6};

    changes.add(testEvent, testData);
    expect(changes.events).to.eql({testEvent, testData});
  });

  it('clean', () => {
    const testEvent = 'Drag';
    const testData = {x:5, y:6};

    changes.clean();
    expect(changes.events).to.empty;
  });

  it('release', () => {
    const result = changes.release();

    expect(result).to.eql({testEvent, testData});
    expect(changes.events).to.empty;
  });
});
