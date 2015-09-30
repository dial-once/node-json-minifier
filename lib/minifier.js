var _ = require('lodash');
var filterTable;

var minify = function(obj) {
  var postMk = [];

  var mk;
  if (typeof obj === 'object') {
    mk = _.mapKeys(obj, function(value, key) {
      if (typeof value === 'object') {
        postMk.push({ k: filterTable[key] || key, v: minify(value) });
      }
      return filterTable[key] || key;
    });

    _.each(postMk, function(v, k) {
      mk[postMk[k].k] = postMk[k].v;
    });
  } else {
    mk = obj;
  }

  return mk;
};

module.exports = function(_filterTable) {
  filterTable = _filterTable || {};
  return {
    minify: function(json) {
      _.each(json, function(view, key) {
        json[key] = minify(view);
      });
    },
    table: filterTable
  };
};