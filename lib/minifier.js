const _ = require('lodash');

let filterTable;
const reverseFilterTable = {};

const minify = (obj, filters) => {
  const postMk = [];

  let mk = _.mapKeys(obj, (value, key) => {
    if (typeof value === 'object' && value) {
      postMk.push({ k: filters[key] || key, v: minify(value, filters) });
    }
    return filters[key] || key;
  });

  _.each(postMk, (v, k) => {
    mk[postMk[k].k] = postMk[k].v;
  });

  if (_.isArray(obj)) {
    mk = _.toArray(mk);
  }

  return mk;
};

module.exports = (_filterTable) => {
  filterTable = _filterTable || {};

  for (const key in filterTable) {
    if (Object.prototype.hasOwnProperty.call(filterTable, key)) {
      reverseFilterTable[filterTable[key]] = key;
    }
  }

  return {
    minify(json) {
      return minify(json, filterTable);
    },
    unminify(json) {
      return minify(json, reverseFilterTable);
    },
    table: filterTable
  };
};
