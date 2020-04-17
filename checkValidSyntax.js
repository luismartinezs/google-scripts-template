// https://developers.google.com/apps-script/guides/v8-runtime
// Executing checkValidSyntax provides information about JS features currently supported

function tertiaryExp(a) {
  return a || 'b';
}

function stringLiteral() {
  const a = 'world';
  return `Hello ${a}`;
}

function logicalOperators(fruit) {
  return fruit || 'orange';
}

function arrForEach(arr) {
  const _arr = [];
  arr.forEach(el => _arr.push(el + el));
  return _arr;
}

function whichEcma() {
  const ecma = {
    es6: {},
    es100: {}
  };
  let k;
  try {
    k = new Map();
    ecma.es6.supported = true;
  } catch (err) {
    ecma.es6.supported = false;
  }

  try {
    k = new HashMap();
    ecma.es100.supported = true;
  } catch (err) {
    ecma.es100.supported = false;
  }
  return ecma;
}

function checkValidSyntax() {
  const a = tertiaryExp('a');
  const b = tertiaryExp(); // work
  const hello = stringLiteral(); // work
  const hey = 'hey'; // 'let' declaration works
  const fruit = logicalOperators(); // work
  const ecma = whichEcma(); // es6 suported, es100 not supported
  const arr = arrForEach([1, 2, 'a']); // works
  var debug = 1; // add a breakpoint to this line
}
