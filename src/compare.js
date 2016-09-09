import { toFloat } from './index';

export const isBefore = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) < toFloat(maybeAfter);

export const isBeforeOrEqual = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) <= toFloat(maybeAfter);

export const isAfter = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) > toFloat(maybeAfter);

export const isAfterOrEqual = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) >= toFloat(maybeAfter);
