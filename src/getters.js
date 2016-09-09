import { daysBetween } from './index';

const WEEKDAY_REFERENCE_DATE = '2001-01-01';
const DAYS_IN_ONE_WEEK = 7;

const fixNegativeDaysBetween = (days) => days >= 0 ? days : DAYS_IN_ONE_WEEK + days;
export const getWeekdayOf = (isoString) => {
  const days = daysBetween(WEEKDAY_REFERENCE_DATE, isoString);
  return fixNegativeDaysBetween(days % DAYS_IN_ONE_WEEK) + 1;
};
