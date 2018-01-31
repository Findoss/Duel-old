/* globals describe, it */

const mocha = require('mocha');
const { expect } = require('chai');

const Changes = require('../server/classes/changes.js');

const changes = new Changes();

describe('Changes', () => {
  //
  it('add', () => {
    const testEvent = 'Drag';
    const testData = { x: 5, y: 6 };

    changes.add(testEvent, testData);
    expect(changes.events[0]).to.eql({ event: testEvent, data: testData });
  });

  it('clean', () => {
    changes.clean();
    expect(changes.events).to.empty;
  });

  it('release', () => {
    const testEvent = 'Drag';
    const testData = { x: 5, y: 6 };
    changes.add(testEvent, testData);

    const result = changes.release();
    expect(result).to.eql([{ event: testEvent, data: testData }]);
    expect(changes.events).to.empty;
  });
});
