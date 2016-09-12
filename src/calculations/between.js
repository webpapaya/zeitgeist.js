import {
  toFragments,
  addDays,
  removeTimeComponent,
  containsDateComponent,
  isBefore,
  isBetween,
} from '../index';

import {
  isEmpty,
  tco,
} from '../utils';

import {
  ONE_MILLISECOND,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  TIME_UNITS,
  ONE_REGULAR_DAY,
} from '../constants';

import leapSecondData from '../data/leapseconds.json';

const readUnit = (fragments, unit) => (fragments[unit] || 0);
const floor = (value) => Math.floor(value);

// See http://math.stackexchange.com/questions/683312/formula-to-calculate-difference-between-two-dates
const daysInYear = (isoString) => {
  const fragments = toFragments(isoString);
  const month = fragments.month <= 2 ? fragments.month + 12 : fragments.month;
  const year = fragments.month <= 2 ? fragments.year - 1 : fragments.year;

  const daysOfYear = 365 * year + floor(year / 4) - floor(year / 100) + floor(year / 400);
  const daysOfMonth = floor((153 * month + 8) / 5);

  return daysOfYear + daysOfMonth + fragments.day;
};

export const daysBetween = (from, to) => {
  const daysFrom = containsDateComponent(from) ? daysInYear(from) : 0;
  const daysTo = containsDateComponent(to) ? daysInYear(to) : 0;

  return daysTo - daysFrom;
};

export const leapMicrosecondsBetween = (from, to) => {
  const microsecondsBetween = Object.keys(leapSecondData)
    .reduce((totalLeapSeconds, dateOfLeapSecond) => {
      return isBetween(dateOfLeapSecond, { from, to })
        ? totalLeapSeconds + leapSecondData[dateOfLeapSecond].correction
        : totalLeapSeconds;
    }, 0);

  return microsecondsBetween * ONE_SECOND;
};

export const microsecondsBetween = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);

  const microsecondsBetweenDays = Math.abs(daysBetween(from, to) * ONE_REGULAR_DAY);
  const leapSeconds = leapMicrosecondsBetween(from, to);

  return Object.keys(TIME_UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = TIME_UNITS[unit];
    return totalSeconds + (valueToBeAdded * multiplier);
  }, microsecondsBetweenDays + leapSeconds);
};

export const millisecondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_MILLISECOND;
export const secondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_SECOND;
export const minutesBetween = (from, to) => microsecondsBetween(from, to) / ONE_MINUTE;
export const hoursBetween = (from, to) => microsecondsBetween(from, to) / ONE_HOUR;

const calculateDatesBetween = tco((from, to, dates = []) => {
  const nextDates = !isEmpty(from) ? [...dates, from] : [...dates];
  if (from === to) { return nextDates; }

  const direction = isBefore(from, to) ? 1 : -1;
  const nextFrom = addDays(from, direction);
  return calculateDatesBetween(nextFrom, to, nextDates);
});

export const datesBetween = (from, to) => {
  const fromWithoutTimeComponent = removeTimeComponent(from);
  const toWithoutTimeComponent = removeTimeComponent(to);
  return calculateDatesBetween(fromWithoutTimeComponent, toWithoutTimeComponent);
};
