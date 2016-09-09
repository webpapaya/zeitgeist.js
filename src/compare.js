import { toFloat } from './index';

export const isSame = (firstDate, secondDate) =>
  toFloat(firstDate) === toFloat(secondDate);

export const isBefore = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) < toFloat(maybeAfter);

export const isSameOrBefore = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) <= toFloat(maybeAfter);

export const isAfter = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) > toFloat(maybeAfter);

export const isSameOrAfter = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) >= toFloat(maybeAfter);
