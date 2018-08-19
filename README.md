# node-json-minifier

[![Sonar](http://proxy.dialonce.net/sonar/api/badges/gate?key=node-json-minifier)](http://sonar.dialonce.net/dashboard?id=node-json-minifier)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-json-minifier&metric=ncloc)](http://sonar.dialonce.net/dashboard?id=node-json-minifier)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-json-minifier&metric=coverage)](http://sonar.dialonce.net/dashboard?id=node-json-minifier)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-json-minifier&metric=code_smells)](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-json-minifier&metric=coverage)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-json-minifier&metric=bugs)](http://sonar.dialonce.net/dashboard?id=node-json-minifier)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-json-minifier&metric=sqale_debt_ratio)](http://sonar.dialonce.net/dashboard?id=node-json-minifier)

A two-way JSON minifier to reduce JSON size and amount of data transferred on clients. Can also act as an obfuscator.

# how to use

```npm install json-minifier```

## Compressor

```js
var specs = {
  key: 'k',
  MySuperLongKey: 'm',
  SomeAnotherPropertyThatIsRealyLong: 's'
};

var minifier = require('json-minifier')(specs);

var json = minifier.minify({
  SomeAnotherPropertyThatIsRealyLong: 1234,
  MySuperLongKey: 'Home',
  key: 0
});

/*
{ s: 1234,
  m: 'Home',
  k: 0 }
*/
console.log(json);
```

## Uncompressor
Using the json object from the previous exemple:
```js
/*
{
  SomeAnotherPropertyThatIsRealyLong: 1234,
  MySuperLongKey: 'Home',
  key: 0
}
*/
console.log(minifier.unminify(json));
```

### Use in browser
You can implement your own, don't need to require our module or use browserify. Use the following snippet:

```json``` is your compressed json, and you exposed your compression table in the ```reverseJsonFilters``` array.

```js
function unzip(json) {
  for (var key in json) {
    if (typeof json[key] === 'object') {
      unzip(json[key]);
    }
    if (reverseJsonFilters[key] !== undefined) {
      json[reverseJsonFilters[key]] = json[key];
      delete json[key];
    }
  }
}
```
