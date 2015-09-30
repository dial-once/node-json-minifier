var minifier = require('../')();

function doneCallback(done){
  return function(){
    done();
  };
}

var item;

describe('JSON Minifier minify logic', function() {
  it('should not minify object when no minification table provided', function(done){
    item = minifier.minify({ key: 'something' });
    expect(item.key).not.toBe(undefined);
    expect(item.key).toBe('something');
    done();
  });

  it('should not minify object inside object when no minification table provided', function(done){
    item = minifier.minify({ key: { secondLevel: 'something' } });
    expect(item.key.secondLevel).not.toBe(undefined);
    expect(item.key.secondLevel).toBe('something');
    done();
  });

  it('should not minify object when minification table don\'t match the object', function(done){
    minifier = require('../')({ key2: 'k' });
    item = minifier.minify({ key: 'something' });
    expect(item.key).not.toBe(undefined);
    expect(item.key).toBe('something');
    done();
  });

  it('should minify object when minification table match the object', function(done){
    minifier = require('../')({ key2: 'k' });
    item = minifier.minify({ key2: 'something' });
    expect(item.k).not.toBe(undefined);
    expect(item.k).toBe('something');
    done();
  });
});
