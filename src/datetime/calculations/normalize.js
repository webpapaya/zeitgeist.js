import {
  fromJulianDay,
  toJulianDay,
  isValid,
} from '../index';

export const normalize = (isoString) => isValid(isoString)
  ? fromJulianDay(toJulianDay(isoString))
  : 'Invalid Date';
