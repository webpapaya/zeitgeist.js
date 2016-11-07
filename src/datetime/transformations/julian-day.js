import {
  SECONDS_IN_REGULAR_DAY,
  MINUTES_IN_REGULAR_DAY,
  HOURS_IN_REGULAR_DAY,
} from '../constants';

import { toFragments, toIso } from '../index';
import { fractionOfNumber } from '../../utils';

const floor = (value) => Math.floor(value);
const round = (value) => Math.round(value);
const sum = (array) => array.reduce((totalValue, value) => totalValue + value, 0);

const calculateLeapDayOffset = ({ year }) => 2 - floor(year / 100) + floor(year / 400);
const calculateDayFraction = ({ hour = 0, minute = 0, second = 0 }) =>
  hour / HOURS_IN_REGULAR_DAY + minute / MINUTES_IN_REGULAR_DAY + second / SECONDS_IN_REGULAR_DAY;

const toCalculationFragments = (isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  const month = fragments.month <= 2 ? fragments.month + 12 : fragments.month;
  const year = fragments.month <= 2 ? fragments.year - 1 : fragments.year;

  return { ...fragments, month, year };
};

const AVERAGE_YEAR_DURATION = 365.25;
const AVERAGE_MONTH_DURATION = 30.6001;

// https://www.wikiwand.com/de/Julianisches_Datum
export const toJulianDay = (isoDatetime) => {
  const fragments = toCalculationFragments(isoDatetime);

  return sum([
    floor(AVERAGE_YEAR_DURATION * (fragments.year + 4716)),
    floor(AVERAGE_MONTH_DURATION * (fragments.month + 1)),
    calculateLeapDayOffset(fragments),
    calculateDayFraction(fragments),
    fragments.day,
    -1524.5,
  ]);
};

// https://www.wikiwand.com/de/Julianisches_Datum
export const fromJulianDay = (julianDay) => {
  return toIso({
    ...dateComponentFromJulianDay(julianDay),
    ...timeComponentFromJulianDay(julianDay),
  });
};

const fromCalculationFragments = (fragments) => {
  const month = fragments.month < 14
    ? fragments.month - 1
    : fragments.month - 13;

  const year = month > 2
    ? fragments.year - 4716
    : fragments.year - 4715;

  return { month, year, day: fragments.day };
};

const dateComponentFromJulianDay = (julianDay) => {
  const fullDays = floor(julianDay + 0.5);
  const normalizedDays = floor((fullDays - 1867216.25) / 36524.25);
  const daysSinceJulianCalendar = fullDays + 1 + normalizedDays - floor(normalizedDays / 4) + 1524;

  const year = floor((daysSinceJulianCalendar - 122.1) / AVERAGE_YEAR_DURATION);
  const daysWithoutYear = floor(AVERAGE_YEAR_DURATION * year);

  const month = floor((daysSinceJulianCalendar - daysWithoutYear) / AVERAGE_MONTH_DURATION);
  const day = daysSinceJulianCalendar - daysWithoutYear - floor(AVERAGE_MONTH_DURATION * month);

  return fromCalculationFragments({ year, month, day });
};

const timeComponentFromJulianDay = (julianDay) => {
  const fractionOfDayInSeconds = round(fractionOfNumber(julianDay + 0.5) * SECONDS_IN_REGULAR_DAY);
  const secondsWithoutHours = fractionOfDayInSeconds % 3600;

  const hour = floor(fractionOfDayInSeconds / 3600);
  const minute = floor(secondsWithoutHours / 60);
  const second = secondsWithoutHours % 60;

  return { hour, minute, second };
};
