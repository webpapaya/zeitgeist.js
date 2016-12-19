import {
  toIso,
} from '../index';
import {
  fromJulianDay as _fromJulianDay,
  toJulianDay as _toJulianDay,
} from './julian-day.internal';

export const fromJulianDay = (julianDay) => toIso(_fromJulianDay(julianDay));
export const toJulianDay = _toJulianDay;
