const chai = require('chai');
const assert = require('assert');
let minifier = require('../')();

const { expect } = chai;

let item;

describe('JSON Minifier object formatting', () => {
  it('should keep array type when input is an array', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify([{ key2: 'something' }]);
    expect(item.length).to.not.equal(undefined);
    done();
  });

  it('should keep object type when input is an object', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify({ key2: 'something' });
    assert.equal(item.length, undefined);
    done();
  });
});
