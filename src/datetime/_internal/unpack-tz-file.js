// Extracted from TODO: add file

import { pipe } from '../../utils';

const insertAt = (index, value, array) => {
  const _array = [...array];
  _array[index] = value;
  return _array;
};

const splitBy = (pattern) => (string) =>
  string.split(pattern);

const itemAtIndex = (index) => (array) => array[index];

// -------- END UTILS ------------- //


const charCodeToInt = (charCode) => {
  if (charCode > 96) { return charCode - 87; }
  if (charCode > 64) { return charCode - 29; }

  return charCode - 48;
};

function unpackBase60(string) {
  let i = 0;
  let parts = string.split('.');
  let whole = parts[0];
  let fractional = parts[1] || '';
  let multiplier = 1;
  let num;
  let out = 0;
  let sign = 1;

  // handle negative numbers
  if (string.charCodeAt(0) === 45) {
    i = 1;
    sign = -1;
  }

  // handle digits before the decimal
  for (i; i < whole.length; i++) {
    num = charCodeToInt(whole.charCodeAt(i));
    out = 60 * out + num;
  }

  // handle digits after the decimal
  for (i = 0; i < fractional.length; i++) {
    multiplier = multiplier / 60;
    num = charCodeToInt(fractional.charCodeAt(i));
    out += num * multiplier;
  }

  return out * sign;
}

const arrayToInt = (array) =>
  array.map(unpackBase60);


const intToUntil = (array, index = 0) => {
  if (index === array.length) { return insertAt(index, Infinity, array); }

  const until = Math.round((array[index - 1] || 0) + (array[index] * 60000));

  return intToUntil(insertAt(index, until, array), index + 1);
};

const mapIndices = (indices) => (source) =>
  indices.map((i) => source[indices[i]]);

const extractIndices = (data) => pipe(
  splitBy('|'),
  itemAtIndex(3),
  splitBy(''),
  arrayToInt,
)(data);

const offsetAtIndex = (indices, data, index) => pipe(
  splitBy('|'),
  itemAtIndex(2),
  splitBy(' '),
  arrayToInt,
  mapIndices(indices),
  itemAtIndex(index),
)(data);

const untilAtIndex = (indices, data, index) => pipe(
  splitBy('|'),
  itemAtIndex(4),
  splitBy(' '),
  arrayToInt,
  intToUntil,
  itemAtIndex(index),
)(data);

const abbrAtIndex = (indices, data, index) => pipe(
  splitBy('|'),
  itemAtIndex(1),
  splitBy(' '),
  mapIndices(indices),
  itemAtIndex(index),
)(data);

const unpack = (data) => {
  const indices = extractIndices(data);
  return indices.map((_, index) => ({
    until: untilAtIndex(indices, data, index),
    abbr: abbrAtIndex(indices, data, index),
    offset: offsetAtIndex(indices, data, index)
  }));
};

export default unpack;
