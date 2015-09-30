var minifier = require('../')();

function doneCallback(done){
  return function(){
    done();
  };
}

describe('JSON Minifier entry point', function() {
  it('should expose minify function', function(done){
    expect(minifier.minify).not.toBe(undefined);
    expect(typeof minifier.minify).toBe('function');
    done();
  });
});
