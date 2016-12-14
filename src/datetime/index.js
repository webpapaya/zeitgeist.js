export {
  toIso,
  toFragments,
  toIsoDate,
  toIsoTime,
  toFloat,

  removeTimeComponent,
  removeDateComponent,

  fromJulianDay,
  toJulianDay,

  toJsDate,
  fromJsDate,
  now,
  toUtc,
} from './transformations/index';

export {
  datesBetween,
  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,
  daysBetween,

  addDuration,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  addSeconds,

  addSeconds as addSecond,
  addMinutes as addMinute,
  addHours as addHour,
  addDays as addDay,
  addMonths as addMonth,
  addYears as addYear,

  subtractDuration,
  subtractSeconds,
  subtractSeconds as subtractSecond,
  subtractMinutes,
  subtractMinutes as subtractMinute,
  subtractHours,
  subtractHours as subtractHour,
  subtractDays,
  subtractDays as subtractDay,
  subtractMonths,
  subtractMonths as subtractMonth,
  subtractYears,
  subtractYears as subtractYear,

  floorSecond,
  floorSecond as floorSeconds,
  floorMinute,
  floorMinute as floorMinutes,
  floorHour,
  floorHour as floorHours,
  floorDay,
  floorDay as floorDays,
  floorWeek,
  floorWeek as floorWeeks,
  floorMonth,
  floorMonth as floorMonths,
  floorYear,
  floorYear as floorYears,

  ceilSecond,
  ceilSecond as ceilSeconds,
  ceilMinute,
  ceilMinute as ceilMinutes,
  ceilHour,
  ceilHour as ceilHours,
  ceilDay,
  ceilDay as ceilDays,
  ceilWeek,
  ceilWeek as ceilWeeks,
  ceilMonth,
  ceilMonth as ceilMonths,
  ceilYear,
  ceilYear as ceilYears,

  roundYear,
  roundYear as roundYears,
  roundMonth,
  roundMonth as roundMonths,
  roundDay,
  roundDay as roundDays,
  roundHour,
  roundHour as roundHours,
  roundMinute,
  roundMinute as roundMinutes,
  roundSecond,
  roundSecond as roundSeconds,
} from './calculations/index';

export {
  getWeekday,
  getWeekOfYear,
  getDayOfYear,

  getYear,
  getMonth,
  getDay,
  getHour,
  getMinute,
  getSecond,
  getTimezone,

  getDateComponent,
  getTimeComponent,

  isLeapYear,
  containsDateComponent,
  containsTimeComponent,
  containsTimezone,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  daysInMonth,
  daysInYear,
} from './getters';

export {
  isValid,
  validateFirstArg,
} from './validate';

export { format } from './format';


import { INVALID_DATETIME } from './constants';
import { isValid } from './validate';
import { curry } from '../utils';
import {
  normalize as _normalize,

  endOfSecond as _endOfSecond,
  endOfMinute as _endOfMinute,
  endOfHour as _endOfHour,
  endOfDay as _endOfDay,
  endOfWeek as _endOfWeek,
  endOfMonth as _endOfMonth,
  endOfYear as _endOfYear,

  startOfSecond as _startOfSecond,
  startOfMinute as _startOfMinute,
  startOfHour as _startOfHour,
  startOfDay as _startOfDay,
  startOfWeek as _startOfWeek,
  startOfMonth as _startOfMonth,
  startOfYear as _startOfYear,
} from './calculations/index';

export { applyFormat } from './format';

import {
  roundDecorator,
  calculationDecorator,
} from './decorator';

import { getTimezone } from './getters';
import { toUtc as _toUtc } from './transformations/index';
import { containsDateComponent as _containsDateComponent } from './getters';
import { applyFormat } from './format';

const betweenDecorator = (fn) => curry((from, to) => {
  return fn(
    dropTimezone(_containsDateComponent(from) ? _toUtc(from) : from),
    dropTimezone(_containsDateComponent(to) ? _toUtc(to) : to)
  );
});


export const normalize = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return `${_normalize(isoDatetime)}${timezone}`;
};

export const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

export const endOfSecond = roundDecorator(_endOfSecond);
export const endOfMinute = roundDecorator(_endOfMinute);
export const endOfHour = roundDecorator(_endOfHour);
export const endOfDay = roundDecorator(_endOfDay);
export const endOfWeek = roundDecorator(_endOfWeek);
export const endOfMonth = roundDecorator(_endOfMonth);
export const endOfYear = roundDecorator(_endOfYear);

export const startOfSecond = roundDecorator(_startOfSecond);
export const startOfMinute = roundDecorator(_startOfMinute);
export const startOfHour = roundDecorator(_startOfHour);
export const startOfDay = roundDecorator(_startOfDay);
export const startOfWeek = roundDecorator(_startOfWeek);
export const startOfMonth = roundDecorator(_startOfMonth);
export const startOfYear = roundDecorator(_startOfYear);

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
} from './compare';

export const isBetween = curry(({ from, to }, isoDateTime) =>
  _isBetween({ from: _toUtc(from), to: _toUtc(to) }, _toUtc(isoDateTime)));

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

import {
  fromUnixTimestamp as _fromUnixTimestamp,
  toUnixTimestamp as _toUnixTimestamp,
} from './transformations/unix-timestamp';

export const fromUnixTimestamp = _fromUnixTimestamp;
export const toUnixTimestamp = (isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }
  return _toUnixTimestamp(isoDateTime);
};

