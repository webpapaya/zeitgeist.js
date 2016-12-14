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

  floorSecond as floorSeconds,
  floorMinute as floorMinutes,
  floorHour as floorHours,
  floorDay as floorDays,
  floorWeek as floorWeeks,
  floorMonth as floorMonths,
  floorYear as floorYears,

  ceilSecond as ceilSeconds,
  ceilMinute as ceilMinutes,
  ceilHour as ceilHours,
  ceilDay as ceilDays,
  ceilWeek as ceilWeeks,
  ceilMonth as ceilMonths,
  ceilYear as ceilYears,

  roundSecond as roundSeconds,
  roundMinute as roundMinutes,
  roundHour as roundHours,
  roundDay as roundDays,
  roundMonth as roundMonths,
  roundYear as roundYears,
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

  microsecondsBetween as _microsecondsBetween,
  millisecondsBetween as _millisecondsBetween,
  secondsBetween as _secondsBetween,
  minutesBetween as _minutesBetween,
  hoursBetween as _hoursBetween,
  daysBetween as _daysBetween,

  subtractDuration as _subtractDuration,
  subtractYears as _subtractYears,
  subtractMonths as _subtractMonths,
  subtractDays as _subtractDays,
  subtractHours as _subtractHours,
  subtractMinutes as _subtractMinutes,
  subtractSeconds as _subtractSeconds,

  ceilYear as _ceilYear,
  ceilMonth as _ceilMonth,
  ceilWeek as _ceilWeek,
  ceilDay as _ceilDay,
  ceilHour as _ceilHour,
  ceilMinute as _ceilMinute,
  ceilSecond as _ceilSecond,

  roundYear as _roundYear,
  roundMonth as _roundMonth,
  roundWeek as _roundWeek,
  roundDay as _roundDay,
  roundHour as _roundHour,
  roundMinute as _roundMinute,
  roundSecond as _roundSecond,

  floorYear as _floorYear,
  floorMonth as _floorMonth,
  floorWeek as _floorWeek,
  floorDay as _floorDay,
  floorHour as _floorHour,
  floorMinute as _floorMinute,
  floorSecond as _floorSecond,

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
import { toUtc as _toUtc } from './transformations/index'
import { containsDateComponent as _containsDateComponent } from './getters';
import { applyFormat } from './format';

const betweenDecorator = (fn) => curry((from, to) => {
  return fn(
    dropTimezone(_containsDateComponent(from) ? _toUtc(from) : from),
    dropTimezone(_containsDateComponent(to) ? _toUtc(to) : to)
  );
});

export const microsecondsBetween = betweenDecorator(_microsecondsBetween);
export const millisecondsBetween = betweenDecorator(_millisecondsBetween);
export const secondsBetween = betweenDecorator(_secondsBetween);
export const minutesBetween = betweenDecorator(_minutesBetween);
export const hoursBetween = betweenDecorator(_hoursBetween);
export const daysBetween = betweenDecorator(_daysBetween);

export const normalize = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return`${_normalize(isoDatetime)}${timezone}`;
};

export const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};


export const ceilYear = roundDecorator(_ceilYear);
export const ceilMonth = roundDecorator(_ceilMonth);
export const ceilWeek = roundDecorator(_ceilWeek);
export const ceilDay = roundDecorator(_ceilDay);
export const ceilHour = roundDecorator(_ceilHour);
export const ceilMinute = roundDecorator(_ceilMinute);
export const ceilSecond = roundDecorator(_ceilSecond);

export const roundYear = roundDecorator(_roundYear);
export const roundMonth = roundDecorator(_roundMonth);
export const roundWeek = roundDecorator(_roundWeek);
export const roundDay = roundDecorator(_roundDay);
export const roundHour = roundDecorator(_roundHour);
export const roundMinute = roundDecorator(_roundMinute);
export const roundSecond = roundDecorator(_roundSecond);

export const floorYear = roundDecorator(_floorYear);
export const floorMonth = roundDecorator(_floorMonth);
export const floorWeek = roundDecorator(_floorWeek);
export const floorDay = roundDecorator(_floorDay);
export const floorHour = roundDecorator(_floorHour);
export const floorMinute = roundDecorator(_floorMinute);
export const floorSecond = roundDecorator(_floorSecond);

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
export const toUnixTimestamp = (isoDateTime) =>{
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }
  return _toUnixTimestamp(isoDateTime);
}

