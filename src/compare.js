import { toFloat } from './index';

export const isSame = (firstDate, secondDate) =>
  toFloat(firstDate) === toFloat(secondDate);

export const isBefore = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) < toFloat(maybeAfter);

export const isSameOrBefore = (maybeBefore, maybeAfter) =>
  isSame(maybeBefore, maybeAfter) || isBefore(maybeBefore, maybeAfter);

export const isAfter = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) > toFloat(maybeAfter);

export const isSameOrAfter = (maybeBefore, maybeAfter) =>
  isSame(maybeBefore, maybeAfter) || isAfter(maybeBefore, maybeAfter);

export const isBetween = (dateToCheck, { from, to }) => {
  return !isSameOrAfter(from, to)
    ? isSameOrAfter(to, dateToCheck) && isSameOrBefore(from, dateToCheck)
    : isSameOrAfter(from, dateToCheck) && isSameOrBefore(to, dateToCheck);
};