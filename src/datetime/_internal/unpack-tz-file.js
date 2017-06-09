import { pipe, insertAt, splitBy, itemAtIndex } from '../../utils';
import unpackBase60 from './unpack-base60';

const arrayToInt = (array) =>
  array.map(unpackBase60);

const mapIndices = (indices) => (source) =>
  indices.map((i) => source[indices[i]]);

const intToUntil = (array, index = 0) => {
  if (index === array.length) { return insertAt(index, Infinity, array); }

  const until = Math.round((array[index - 1] || 0) + (array[index] * 60000));

  return intToUntil(insertAt(index, until, array), index + 1);
};

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
    offset: offsetAtIndex(indices, data, index),
  }));
};

export default unpack;
