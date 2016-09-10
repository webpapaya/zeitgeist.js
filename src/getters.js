import { daysBetween, toFragments, toIso } from './index';

const WEEKDAY_REFERENCE_DATE = '2001-01-01';
const DAYS_IN_ONE_WEEK = 7;

const fixNegativeDaysBetween = (days) => days >= 0 ? days : DAYS_IN_ONE_WEEK + days;
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

const doesWeekBelongToPreviousYear = (isoString) =>
  calculateWeekOfYear(isoString) === 0;

export const getWeekOfYear = (isoString) =>
  doesWeekBelongToPreviousYear(isoString) ? 53 : calculateWeekOfYear(isoString);

