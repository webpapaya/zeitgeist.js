import { curry } from '../utils';
import betweenDecorator from './_internal/between-decorator';
import { toUtc } from './index';
import {
  isBetween as _isBetween,
  isSame as _isSame,
  isBefore as _isBefore,
  isAfter as _isAfter,
  isSameOrAfter as _isSameOrAfter,
  isSameOrBefore as _isSameOrBefore,

  isSameYear as _isSameYear,
  isSameMonth as _isSameMonth,
  isSameDay as _isSameDay,
  isSameHour as _isSameHour,
  isSameMinute as _isSameMinute,
  isSameSecond as _isSameSecond,
} from './compare.internal';

export const isBetween = curry(({ from, to }, isoDateTime) =>
  _isBetween({ from: toUtc(from), to: toUtc(to) }, toUtc(isoDateTime)));

export const isSame = betweenDecorator(_isSame);
export const isBefore = betweenDecorator(_isBefore);
export const isAfter = betweenDecorator(_isAfter);
export const isSameOrAfter = betweenDecorator(_isSameOrAfter);
export const isSameOrBefore = betweenDecorator(_isSameOrBefore);

export const isSameYear = betweenDecorator(_isSameYear);
export const isSameMonth = betweenDecorator(_isSameMonth);
export const isSameDay = betweenDecorator(_isSameDay);
export const isSameHour = betweenDecorator(_isSameHour);
export const isSameMinute = betweenDecorator(_isSameMinute);
export const isSameSecond = betweenDecorator(_isSameSecond);
