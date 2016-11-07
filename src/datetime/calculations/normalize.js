import { validateFirstArg as validate } from '../validate';
import {
  fromJulianDay,
  toJulianDay,
} from '../index';

export const normalize = validate((isoDatetime) =>
  fromJulianDay(toJulianDay(isoDatetime)));
