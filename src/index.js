import {
  FEBRUARY,
  DAYS_IN_MONTHS,
} from './constants';

import {
  toFragments,
  removeTimeComponent,
  removeDateComponent,
} from './transformations/index';

import { isEmpty } from './utils';

const isLeapMonth = (isoString, month) =>
  month === FEBRUARY && isLeapYear(isoString);

export const daysInYear = (isoString) => isLeapYear(isoString) ? 366 : 365;

export const daysInMonth = (isoString) => {
  const { month = 1 } = toFragments(isoString);
  if (isLeapMonth(isoString, month)) { return 29; }
  return DAYS_IN_MONTHS[month];
};

export const isLeapYear = (isoString) => {
  const { year } = toFragments(isoString);
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};

export const isLastDayOfMonth = (isoString) => {
  const { day } = toFragments(isoString);
  return daysInMonth(isoString) === day;
};

export const isFirstDayOfMonth = (isoString) => {
  const { day } = toFragments(isoString);
  return day === 1;
};

export const containsDateComponent = (isoString) => !isEmpty(removeTimeComponent(isoString));
export const containsTimeComponent = (isoString) => !isEmpty(removeDateComponent(isoString));

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
} from './transformations/index';

export {
  normalize,

  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,

  datesBetween,
  daysBetween,

  addSeconds,
  addSeconds as addSecond,
  addMinutes,
  addMinutes as addMinute,
  addHours,
  addHours as addHour,
  addDays,
  addDays as addDay,
  addMonths,
  addMonths as addMonth,
  addYears,
  addYears as addYear,

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
} from './getters';

export {
  isBetween,
  isSame,
  isBefore,
  isAfter,
  isSameOrAfter,
  isSameOrBefore,

  isSameYear,
  isSameMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
} from './compare';

export { format } from './format';
