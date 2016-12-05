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

export const getWeekday = (isoDatetime) => {
  const days = daysBetween(WEEKDAY_REFERENCE_DATE, isoDatetime);
  return fixNegativeDaysBetween(days % DAYS_IN_ONE_WEEK) + 1;
};

export const getDayOfYear = (isoDatetime) =>
  daysBetween(toIso({ year: toFragments(isoDatetime).year, month: 1, day: 1 }), isoDatetime) + 1;

// See: https://en.wikipedia.org/wiki/ISO_week_date#Relation_with_the_Gregorian_calendar
// Only support ISO week of the year for now.
const calculateWeekOfYear = (isoDatetime) =>
  Math.floor((getDayOfYear(isoDatetime) - getWeekday(isoDatetime) + 10) / 7);

export const doesWeekBelongToPreviousYear = (isoDatetime) =>
  calculateWeekOfYear(isoDatetime) === 0;

export const getWeekOfYear = (isoDatetime) =>
  doesWeekBelongToPreviousYear(isoDatetime) ? 53 : calculateWeekOfYear(isoDatetime);

const parseIsoString = (fn) => (isoDatetime) => fn(toFragments(isoDatetime));

export const getYear = parseIsoString(({ year }) => year);
export const getMonth = parseIsoString(({ month }) => month);
export const getDay = parseIsoString(({ day }) => day);
export const getHour = parseIsoString(({ hour }) => hour);
export const getMinute = parseIsoString(({ minute }) => minute);
export const getSecond = parseIsoString(({ second }) => second);

const isLeapMonth = (isoDatetime, month) =>
  month === FEBRUARY && isLeapYear(isoDatetime);

export const isLeapYear = (isoDatetime) => {
  const { year } = toFragments(isoDatetime);
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};

export const daysInYear = (isoDatetime) => isLeapYear(isoDatetime) ? 366 : 365;

export const daysInMonth = (isoDatetime) => {
  const { month = 1 } = toFragments(isoDatetime);
  if (isLeapMonth(isoDatetime, month)) { return 29; }
  return DAYS_IN_MONTHS[month];
};

export const isLastDayOfMonth = (isoDatetime) => {
  const { day } = toFragments(isoDatetime);
  return daysInMonth(isoDatetime) === day;
};

export const isFirstDayOfMonth = (isoDatetime) => {
  const { day } = toFragments(isoDatetime);
  return day === 1;
};

export const containsDateComponent = (isoDatetime) => !isEmpty(removeTimeComponent(isoDatetime));
export const containsTimeComponent = (isoDatetime) => !isEmpty(removeDateComponent(isoDatetime));
export const containsTimezone = (isoDatetime) =>
  isoDatetime.match(/([+-]\d\d:\d\d)|(Z)$/) !== null;
