const chai = require('chai');
const assert = require('assert');
let minifier = require('../')();

const { expect } = chai;
let item;

describe('JSON Minifier minify logic', () => {
  it('should not minify object when no minification table provided', (done) => {
    item = minifier.minify({ key: 'something' });
    expect(item.key).to.not.equal(undefined);
    assert.equal(item.key, 'something');
    done();
  });

  it('should not minify object inside object when no minification table provided', (done) => {
    item = minifier.minify({ key: { secondLevel: 'something' } });
    expect(item.key.secondLevel).to.not.equal(undefined);
    assert.equal(item.key.secondLevel, 'something');
    done();
  });

  it('should not minify object when minification table don\'t match the object', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify({ key: 'something' });
    expect(item.key).to.not.equal(undefined);
    assert.equal(item.key, 'something');
    done();
  });

  it('should minify object when minification table match the object', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify({ key2: 'something' });
    expect(item.k).to.not.equal(undefined);
    assert.equal(item.k, 'something');
    done();
  });

  it('should minify nested object when minification table match the object', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify({ subLevel: { key2: 'something' } });
    expect(item.subLevel.k).to.not.equal(undefined);
    assert.equal(item.subLevel.k, 'something');
    done();
  });

  it('should minify array of objects when minification table match the object', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify([{ subLevel: { key2: 'something' } }]);
    expect(item[0].subLevel.k).to.not.equal(undefined);
    assert.equal(item[0].subLevel.k, 'something');
    done();
  });

  it('should minify an array inside an array of objects when minification table match the object', (done) => {
    minifier = require('../')({ key2: 'k' }); // eslint-disable-line global-require
    item = minifier.minify([{ subLevel: [{ key2: 'something' }, { key2: 'something else' }] }]);
    expect(item[0].subLevel[0].k).to.not.equal(undefined);
    assert.equal(item[0].subLevel[0].k, 'something');
    expect(item[0].subLevel[1].k).to.not.equal(undefined);
    assert.equal(item[0].subLevel[1].k, 'something else');
    done();
  });
});
