const {
  entriesToObject,
  tabularDataToObjects,
  getIndexOfLongestArray,
  getArrayDepth,
  filterArrayByFiltererArray,
  mapArrayPairsToObject
} = require('../helper');

describe('entriesToObject', () => {
  test('Return an object with key value pairs matching input entries', () => {
    const entries = [
      [1, 2],
      [3, 4]
    ];
    expect(entriesToObject(entries)).toEqual({ 1: 2, 3: 4 });
  });
  test('Skip first item if second argument is 1', () => {
    const entries = [
      [1, 2],
      [3, 4]
    ];
    expect(entriesToObject(entries, 1)).toEqual({ 3: 4 });
  });
});

describe('tabularDataToObjects', () => {
  test('Errors out if headings and values arguments are not arrays', () => {
    const headings = 'A';
    const table = 1;
    expect(() => tabularDataToObjects({ headings, table })).toThrow();
  });
  test('Errors out if headings and values arguments are not the same length', () => {
    const headings = ['A', 'B', 'C'];
    const table = [
      [1, 2],
      [3, 4]
    ];
    expect(() => tabularDataToObjects({ headings, table })).toThrow();
  });
  test('Errors out if table is of depth 1', () => {
    const headings = ['A', 'B'];
    const table = [1, 2];
    expect(() => tabularDataToObjects({ headings, table })).toThrow();
  });
  test('Errors out if table is of depth 3', () => {
    const headings = ['A', 'B', 'C'];
    const table = [[[1, 2]], [[3]], [[4]]];
    expect(() => tabularDataToObjects({ headings, table })).toThrow();
  });
  test('Return an object with key-value pairs for arrays of length 1', () => {
    const headings = ['A'];
    const table = [[1]];
    const expected = [{ A: 1 }];
    expect(tabularDataToObjects({ headings, table })).toEqual(expected);
  });
  test('Return an object with key-value pairs for arrays of length 2', () => {
    const headings = ['A', 'B'];
    const table = [[1], [2]];
    const expected = [{ A: 1, B: 2 }];
    expect(tabularDataToObjects({ headings, table })).toEqual(expected);
  });
  test('Return an object with key-value pairs', () => {
    const headings = ['A', 'B', 'C'];
    const table = [
      [1, 2],
      [3, 4],
      [5, 6]
    ];
    const expected = [
      { A: 1, B: 3, C: 5 },
      { A: 2, B: 4, C: 6 }
    ];
    expect(tabularDataToObjects({ headings, table })).toEqual(expected);
  });
  test('Return an object with key-value pairs, with unequal M values', () => {
    const headings = ['A', 'B', 'C'];
    const table = [
      [1, 2],
      [3, 4, 5],
      [6, 7]
    ];
    const expected = [{ A: 1, B: 3, C: 6 }, { A: 2, B: 4, C: 7 }, { B: 5 }];
    expect(tabularDataToObjects({ headings, table })).toEqual(expected);
  });
});

describe('getIndexOfLongestArray', () => {
  test('Return index of longest nested array', () => {
    const array2d = [[1], [2], [3, 4]];
    expect(getIndexOfLongestArray(array2d)).toBe(2);
  });
});

describe('getArrayDepth', () => {
  test('Returns array depth', () => {
    const arrDepth1 = [1, 2];
    const arrDepth2 = [
      [1, 2],
      [3, 4]
    ];
    const arrDepth3 = [
      [[1], [2]],
      [[3], [4]]
    ];
    expect(getArrayDepth(arrDepth1)).toEqual(1);
    expect(getArrayDepth(arrDepth2)).toEqual(2);
    expect(getArrayDepth(arrDepth3)).toEqual(3);
  });
});

describe('filterArrayByFiltererArray', () => {
  test('Requires two arrays as arguments', () => {
    let filterer = [1, 2, 3];
    let filteree = 'Not an array';
    expect(() => filterArrayByFiltererArray(filteree, filterer)).toThrow();
    filterer = 'Not an array';
    expect(() => filterArrayByFiltererArray(filteree, filterer)).toThrow();
    filteree = [1, 2, 3];
    expect(() => filterArrayByFiltererArray(filteree, filterer)).toThrow();
  });

  test('Requires at least 2 arguments', () => {
    let filterer = [1, 2, 3];
    let filteree = [4, 5, 6];
    expect(() => filterArrayByFiltererArray()).toThrow();
    expect(() => filterArrayByFiltererArray(filteree)).toThrow();
  });

  test('Filterer and filteree should have the same length', () => {
    const filterer = [1, 2, 3];
    const filteree = [5, 6, 7, 8];
    expect(() => filterArrayByFiltererArray(filteree, filterer)).toThrow();
  });
  test('Returns filtered elements', () => {
    const filterer = ['', 'TRUTHY', '', 'TRUTHY'];
    const filteree = [1, 2, 3, 4];
    const expected = [2, 4];
    expect(filterArrayByFiltererArray(filteree, filterer)).toEqual(expected);
  });
});

describe('mapArrayPairsToObject', () => {
  test('Requires two arrays as arguments', () => {
    let valuesArray = [1, 2, 3];
    let keysArray = 'Not an array';
    expect(() => mapArrayPairsToObject(keysArray, valuesArray)).toThrow();
    valuesArray = 'Not an array';
    expect(() => mapArrayPairsToObject(keysArray, valuesArray)).toThrow();
    keysArray = [1, 2, 3];
    expect(() => mapArrayPairsToObject(keysArray, valuesArray)).toThrow();
  });

  test('Requires at least 2 arguments', () => {
    let valuesArray = [1, 2, 3];
    let keysArray = [4, 5, 6];
    expect(() => mapArrayPairsToObject()).toThrow();
    expect(() => mapArrayPairsToObject(keysArray)).toThrow();
  });

  test('ValuesArray and keysArray should have the same length', () => {
    const valuesArray = [1, 2, 3];
    const keysArray = [5, 6, 7, 8];
    expect(() => mapArrayPairsToObject(keysArray, valuesArray)).toThrow();
  });
  test('Returns array of objects with key: value pairs by index', () => {
    const valuesArray = [1, 2, 3, 4];
    const keysArray = ['a', 'b', 'c', 'd'];
    const expected = { a: 1, b: 2, c: 3, d: 4 };
    expect(mapArrayPairsToObject(keysArray, valuesArray)).toEqual(expected);
  });
});
