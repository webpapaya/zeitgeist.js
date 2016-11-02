import {
  daysBetween,
  toFragments,
  toIso,
  removeTimeComponent,
  removeDateComponent,
} from './index';
import { isEmpty } from '../utils';
import {
  FEBRUARY,
  DAYS_IN_MONTHS,
} from './constants';

const WEEKDAY_REFERENCE_DATE = '2001-01-01';
const DAYS_IN_ONE_WEEK = 7;

const fixNegativeDaysBetween = (days) => days >= 0
  ? days
  : DAYS_IN_ONE_WEEK + days;

export const getWeekday = (isoString) => {
  const days = daysBetween(WEEKDAY_REFERENCE_DATE, isoString);
  return fixNegativeDaysBetween(days % DAYS_IN_ONE_WEEK) + 1;
};

export const getDayOfYear = (isoString) =>
  daysBetween(toIso({ year: toFragments(isoString).year, month: 1, day: 1 }), isoString) + 1;

// See: https://en.wikipedia.org/wiki/ISO_week_date#Relation_with_the_Gregorian_calendar
// Only support ISO week of the year for now.
const calculateWeekOfYear = (isoString) =>
  Math.floor((getDayOfYear(isoString) - getWeekday(isoString) + 10) / 7);

export const doesWeekBelongToPreviousYear = (isoString) =>
  calculateWeekOfYear(isoString) === 0;

export const getWeekOfYear = (isoString) =>
  doesWeekBelongToPreviousYear(isoString) ? 53 : calculateWeekOfYear(isoString);

const parseIsoString = (fn) => (isoString) => fn(toFragments(isoString));

export const getYear = parseIsoString(({ year }) => year);
export const getMonth = parseIsoString(({ month }) => month);
export const getDay = parseIsoString(({ day }) => day);
export const getHour = parseIsoString(({ hour }) => hour);
export const getMinute = parseIsoString(({ minute }) => minute);
export const getSecond = parseIsoString(({ second }) => second);

const isLeapMonth = (isoString, month) =>
  month === FEBRUARY && isLeapYear(isoString);

export const isLeapYear = (isoString) => {
  const { year } = toFragments(isoString);
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};


export const daysInYear = (isoString) => isLeapYear(isoString) ? 366 : 365;

export const daysInMonth = (isoString) => {
  const { month = 1 } = toFragments(isoString);
  if (isLeapMonth(isoString, month)) { return 29; }
  return DAYS_IN_MONTHS[month];
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

