import { INVALID_DATE } from '../constants';
import {
  fromJulianDay,
  toJulianDay,
  isValid,
} from '../index';

export const normalize = (isoString) => isValid(isoString)
  ? fromJulianDay(toJulianDay(isoString))
  : INVALID_DATE;
