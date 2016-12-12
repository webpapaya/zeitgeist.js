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

  fromUnixTimestamp,
  toUnixTimestamp,

  toJsDate,
  fromJsDate,
  now,
  toUtc,
} from './transformations/index';

export {
  datesBetween,

  addSeconds as addSecond,
  addMinutes as addMinute,
  addHours as addHour,
  addDays as addDay,
  addMonths as addMonth,
  addYears as addYear,

  subtractSeconds as subtractSecond,
  subtractMinutes as subtractMinute,
  subtractHours as subtractHour,
  subtractDays as subtractDay,
  subtractMonths as subtractMonth,
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

  roundSecond,
  roundSecond as roundSeconds,
  roundMinute,
  roundMinute as roundMinutes,
  roundHour,
  roundHour as roundHours,
  roundDay,
  roundDay as roundDays,
  roundMonth,
  roundMonth as roundMonths,
  roundYear,
  roundYear as roundYears,

  startOfSecond,
  startOfMinute,
  startOfHour,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,

  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
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
  isBetween,
  isBefore,
  isAfter,
  isSameOrAfter,
  isSameOrBefore,

  isSame,
  isSameYear,
  isSameMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
} from './compare';

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

  addDuration as _addDuration,
  addYears as _addYears,
  addMonths as _addMonths,
  addDays as _addDays,
  addHours as _addHours,
  addMinutes as _addMinutes,
  addSeconds as _addSeconds,

  subtractDuration as _subtractDuration,
  subtractYears as _subtractYears,
  subtractMonths as _subtractMonths,
  subtractDays as _subtractDays,
  subtractHours as _subtractHours,
  subtractMinutes as _subtractMinutes,
  subtractSeconds as _subtractSeconds,
} from './calculations/index';

import { getTimezone } from './getters';

import { toUtc as _toUtc } from './transformations/index'
import { containsDateComponent as _containsDateComponent } from './getters';
import { applyFormat } from './format';

const betweenDecorator = (fn) => curry((from, to) => {
  return fn(
    _containsDateComponent(from) ? _toUtc(from) : from,
    _containsDateComponent(to) ? _toUtc(to) : to
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

const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

const calculationDecorator = (fn) => curry((amount, isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }

  const timezone = getTimezone(isoDateTime) || '';
  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);

  const result = `${fn(amount, dateTimeWithoutTimezone)}${timezone}`;
  return applyFormat(isoDateTime, result);
});

export const addDuration = calculationDecorator(_addDuration);
export const addYears = calculationDecorator(_addYears);
export const addMonths = calculationDecorator(_addMonths);
export const addDays = calculationDecorator(_addDays);
export const addHours = calculationDecorator(_addHours);
export const addMinutes = calculationDecorator(_addMinutes);
export const addSeconds = calculationDecorator(_addSeconds);

export const subtractDuration = calculationDecorator(_subtractDuration);
export const subtractYears = calculationDecorator(_subtractYears);
export const subtractMonths = calculationDecorator(_subtractMonths);
export const subtractDays = calculationDecorator(_subtractDays);
export const subtractHours = calculationDecorator(_subtractHours);
export const subtractMinutes = calculationDecorator(_subtractMinutes);
export const subtractSeconds = calculationDecorator(_subtractSeconds);
