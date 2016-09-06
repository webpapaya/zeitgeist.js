import {
  FEBRUARY,
  DAYS_IN_MONTHS,
} from './constants';

import { toFragments } from './transformations/index';

const isLeapMonth = (isoString, month) =>
  month === FEBRUARY && isLeapYear(isoString);

export const daysInYear = (isoString) => isLeapYear(isoString) ? 366 : 365;

export const daysInMonth = (isoString) => {
  const { month = 1 } = toFragments(isoString);
  if (isLeapMonth(isoString, month)) { return 29; }
  return DAYS_IN_MONTHS[month];
};

export const isLeapYear = (isoString) => {
  const year = toFragments(isoString).year;
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

export {
  toIso,
  toFragments,
  toIsoDate,
  toIsoTime,

  removeTimeComponent,
  removeDateComponent
} from './transformations/index';

export {
  addDays,
  addMonths,
  addYears,

  subtractDays,
  subtractMonths,
  subtractYears,

  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,

  datesBetween
} from './calculations/index';


