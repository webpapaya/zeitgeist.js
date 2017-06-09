// Extracted from TODO: add file

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

const insertAt = (index, value, array) => {
  const _array = [...array];
  _array[index] = value;
  return _array;
};

const intToUntil = (array, index = 0) => {
  if (index === array.length) { return array; }

  const until = Math.round((array[index - 1] || 0) + (array[index] * 60000));

  return intToUntil(insertAt(index, until, array), index + 1);
};

const mapIndices = (source, indices) =>
  indices.map((i) => source[indices[i]]);

const unpack = (data) => {
  const parts = data.split('|');

  const indices = arrayToInt(parts[3].split(''));
  let untils = arrayToInt(parts[4].split(' '));
  const offsets = mapIndices(arrayToInt(parts[2].split(' ')), indices);

  untils = intToUntil(untils);

  const abbrs = mapIndices(parts[1].split(' '), indices);

  return Array.from({ length: offsets.length }).map((_, index) => {
    return { until: untils[index], abbr: abbrs[index], offset: offsets[index] };
  });
};

export default unpack;
