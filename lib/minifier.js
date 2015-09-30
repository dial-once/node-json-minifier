var _ = require('lodash');
var filterTable;
var reverseFilterTable = {};

var minify = function(obj, filters) {
  var postMk = [];

  var mk = _.mapKeys(obj, function(value, key) {
  if (typeof value === 'object') {
      postMk.push({ k: filters[key] || key, v: minify(value, filterTable) });
    }
    return filters[key] || key;
  });

  _.each(postMk, function(v, k) {
    mk[postMk[k].k] = postMk[k].v;
  });

  return mk;
};

module.exports = function(_filterTable) {
  filterTable = _filterTable || {};

  for (var key in filterTable) {
    if (filterTable.hasOwnProperty(key)) {
      reverseFilterTable[filterTable[key]] = key;
    }
  }

  return {
    minify: function(json) {
      return minify(json, filterTable);
    },
    unminify: function(json) {
      return minify(json, reverseFilterTable);
    },
    table: filterTable
  };
};