import { roundDecorator, fragmentsRoundDecorator } from '../decorator';
import {
  ceilYear as _ceilYear,
  ceilMonth as _ceilMonth,
  ceilWeek as _ceilWeek,
  ceilDay as _ceilDay,
  ceilHour as _ceilHour,
  ceilMinute as _ceilMinute,
  ceilSecond as _ceilSecond,
} from './ceil.internal';

export const ceilYear = roundDecorator(_ceilYear);
export const ceilMonth = roundDecorator(_ceilMonth);
export const ceilWeek = roundDecorator(_ceilWeek);
export const ceilDay = roundDecorator(_ceilDay);
export const ceilHour = roundDecorator(_ceilHour);
export const ceilMinute = roundDecorator(_ceilMinute);
export const ceilSecond = fragmentsRoundDecorator(_ceilSecond);
