

import {
  toJulianDay,
  toFragments,
  removeTimeComponent,
  containsDateComponent,
  isBefore,
  isSame,
} from '../index';

import {
  curry,
  isEmpty,
  tco,
} from '../../utils';

import {
  ONE_MILLISECOND,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  TIME_UNITS,
  ONE_REGULAR_DAY,
} from '../constants';

import addDays from '../add-days';

const readUnit = (fragments, unit) => (fragments[unit] || 0);
const floor = (value) => Math.floor(value);

export const daysBetween = (from, to) => {
  const daysFrom = containsDateComponent(from) ? toJulianDay(from) : 0;
  const daysTo = containsDateComponent(to) ? toJulianDay(to) : 0;

  return floor(daysTo + 0.5) - floor(daysFrom + 0.5);
};

const calculateMicrosecondsBetween = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);
  const microsecondsBetweenDays = Math.abs(daysBetween(from, to) * ONE_REGULAR_DAY);

  return Object.keys(TIME_UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = TIME_UNITS[unit];
    return totalSeconds + (valueToBeAdded * multiplier);
  }, microsecondsBetweenDays);
};

export const microsecondsBetween = (from, to) => isBefore(from, to)
  ? calculateMicrosecondsBetween(to, from) * -1
  : calculateMicrosecondsBetween(from, to);

export const millisecondsBetween = (from, to) =>
  microsecondsBetween(from, to) / ONE_MILLISECOND;

export const secondsBetween = (from, to) =>
  microsecondsBetween(from, to) / ONE_SECOND;

export const minutesBetween = (from, to) =>
  microsecondsBetween(from, to) / ONE_MINUTE;

export const hoursBetween = (from, to) =>
  microsecondsBetween(from, to) / ONE_HOUR;

const calculateDatesBetween = tco((from, to, dates = []) => {
  const nextDates = !isEmpty(from) ? [...dates, from] : [...dates];
  if (isSame(from, to)) { return nextDates; }

  const direction = isBefore(from, to) ? 1 : -1;
  const nextFrom = addDays(direction, from);
  return calculateDatesBetween(nextFrom, to, nextDates);
});

export const datesBetween = curry((from, to) => {
  const fromWithoutTimeComponent = removeTimeComponent(from);
  const toWithoutTimeComponent = removeTimeComponent(to);
  return calculateDatesBetween(fromWithoutTimeComponent, toWithoutTimeComponent);
});
