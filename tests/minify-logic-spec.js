var minifier = require('../')();

function doneCallback(done){
  return function(){
    done();
  };
}

describe('JSON Minifier minify logic', function() {
  it('should not minify object when no minification table provided', function(done){
    var item =  { key: 'something' };
    minifier.minify(item);
    expect(item.key).not.toBe(undefined);
    expect(item.key).toBe('something');
    done();
  });
});
