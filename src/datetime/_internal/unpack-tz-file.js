// Extracted from TODO: add file

import { execute } from '../../../scripts/utils'

function charCodeToInt(charCode) {
  if (charCode > 96) { return charCode - 87; }
  if (charCode > 64) { return charCode - 29; }

  return charCode - 48;
}

function unpackBase60(string) {
  let i = 0,
    parts = string.split('.'),
    whole = parts[0],
    fractional = parts[1] || '',
    multiplier = 1,
    num,
    out = 0,
    sign = 1;

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

function intToUntil(array, length) {
  for (let i = 0; i < length; i++) {
    array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
  }

  array[length - 1] = Infinity;

  return array;
}

const mapIndices = (source, indices) =>
  indices.map((i) => source[indices[i]]);

const unpack = (data) => {
  const parts = data.split('|');

  const indices = arrayToInt(parts[3].split(''));
  const untils = arrayToInt(parts[4].split(' '));
  const offsets = mapIndices(arrayToInt(parts[2].split(' ')), indices);

  intToUntil(untils, indices.length);

  const abbrs = mapIndices(parts[1].split(' '), indices);

  return Array.from({ length: offsets.length }).map((_, index) => {
    return { until: untils[index], abbr: abbrs[index], offset: offsets[index] };
  });
};


export default unpack;
