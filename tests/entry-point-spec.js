const chai = require('chai');
const assert = require('assert');
let minifier = require('../')();

const { expect } = chai;

describe('JSON Minifier entry point', () => {
  it('should expose minify function', (done) => {
    expect(minifier.minify).to.not.equal(undefined);
    assert.equal(typeof minifier.minify, 'function');
    done();
  });

  it('should expose table parameter', (done) => {
    expect(minifier.table).to.not.equal(undefined);
    assert.equal(typeof minifier.table, 'object');
    done();
  });

  it('should expose table parameter provided on require', (done) => {
    minifier = require('../')({ item: 'i' }); // eslint-disable-line global-require
    expect(minifier.table).to.not.equal(undefined);
    assert.equal(typeof minifier.table, 'object');
    assert.equal(minifier.table.item, 'i');
    done();
  });
});
