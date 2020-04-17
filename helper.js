/**
 * @param entries { [[ String, String ]] } array of arrays, each containing a key-value pair: [["key", "value"],..]
 *
 * return { Object } with key: value pairs
 */
function entriesToObject(entries, skipFirst = 0) {
  // If skipFirst is 1, skip first element of the array, because it is the heading of the list
  if (skipFirst < 0 || skipFirst > 1 || skipFirst !== Math.floor(skipFirst)) {
    throw new Error('Second argument should be either 0 or 1');
  }

  return entries.slice(skipFirst).reduce(function(acc, next) {
    acc[next[0]] = next[1];
    return acc;
  }, {});
}

function getArrayDepth(value) {
  return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
}

function getIndexOfLongestArray(array2d) {
  return array2d.reduce((acc, values, index) => {
    return array2d[acc].length >= values.length ? acc : index;
  }, 0);
}

/**
 *
 * @param {{headings, table}} Object headings is a N array, table is an N array of M arrays (an N:M matrix). 1..N x N..M should return a an array of length M
 * return array of length M with elements {key1: value1, ..., keyN, valueN}
 */
function tabularDataToObjects({ headings, table }) {
  if (!Array.isArray(headings) || !Array.isArray(table)) {
    throw new Error('Function tabularDataToObjects: headings and table arguments should be arrays');
  }
  if (headings.length !== table.length) {
    throw new Error(
      'Function tabularDataToObjects: headings and table arguments should have the same length'
    );
  }
  if (getArrayDepth(table) !== 2) {
    throw new Error('Function tabularDataToObjects: table argument is expected to be of depth 2.');
  }

  return table[getIndexOfLongestArray(table)].reduce((items, _, valuesIndex) => {
    const itemData = headings.reduce((obj, heading, headingIndex) => {
      const value = table[headingIndex][valuesIndex];
      if (typeof value === 'undefined') {
        return obj;
      }
      Object.assign(obj, { [heading]: table[headingIndex][valuesIndex] });
      return obj;
    }, {});
    items.push(itemData);
    return items;
  }, []);
}

/**
 *
 * @param {Array[val]} filteree Array with values to filter
 * @param {Array[val]} filterer Array with truthy / falsy values which determine which values to filter based on index
 * @return {Array[val]} Sub array of filteree
 * e.g.
 * filteree [1, 2, 3, 4]
 * filterer ['', 'truthy', 1, false]
 * Returns [ 2, 3 ]
 */
function filterArrayByFiltererArray(filteree, filterer) {
  if (!Array.isArray(filteree) || !Array.isArray(filterer)) {
    throw new Error('Function filterArrayByFiltererArray: Arguments should be two arrays');
  }
  if (filteree.length !== filterer.length) {
    throw new Error('Function filterArrayByFiltererArray: Arguments should have the same length');
  }
  return filteree.filter((value, index) => filterer[index]);
}

function mapArrayPairsToObject(keysArray, valuesArray) {
  if (!Array.isArray(keysArray) || !Array.isArray(valuesArray)) {
    throw new Error('Function mapArrayPairsToObject: Arguments should be two arrays');
  }
  if (keysArray.length !== valuesArray.length) {
    throw new Error('Function mapArrayPairsToObject: Arguments should have the same length');
  }
  return keysArray.reduce((acc, key, index) => {
    Object.assign(acc, { [key]: valuesArray[index] });
    return acc;
  }, {});
}

// Comment when running Google Apps Script
// module.exports = {
//   entriesToObject,
//   tabularDataToObjects,
//   getIndexOfLongestArray,
//   getArrayDepth,
//   filterArrayByFiltererArray,
//   mapArrayPairsToObject
// };
