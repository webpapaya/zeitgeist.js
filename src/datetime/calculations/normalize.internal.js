import {
  fromJulianDay,
  toJulianDay,
} from '../index';

export const normalize = (isoDatetime) =>
  fromJulianDay(toJulianDay(isoDatetime));
