const chai = require('chai');
const minifier = require('../')();

const { expect } = chai;

describe('JSON minifier restore source logic', () => {
  const testCases = [
    {
      title: 'should properly restore nested objects',
      source: { key1: { key2: 4 } }
    },
    {
      title: 'should properly restore null objects',
      source: { key1: null }
    }
  ];

  testCases.forEach((testCase) => {
    it(testCase.title, () => {
      const minified = minifier.minify(testCase.source);
      const unminified = minifier.unminify(minified);
      expect(unminified).deep.equal(testCase.source);
    });
  });
});
