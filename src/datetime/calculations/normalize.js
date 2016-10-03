import {
  fromJulianDay,
  toJulianDay,
} from '../index';

export const normalize = (isoString) => fromJulianDay(toJulianDay(isoString));
