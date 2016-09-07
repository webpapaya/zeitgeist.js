import {
  toFragments,
  addDays,
  removeTimeComponent,
  containsDateComponent,
} from '../index';

import {
  isEmpty
} from '../utils';

import {
  ONE_MILLISECOND,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  TIME_UNITS,
  ONE_REGULAR_DAY,
} from '../constants';

const readUnit = (fragments, unit) => (fragments[unit] || 0);
const floor = (value) => Math.floor(value);

// See http://math.stackexchange.com/questions/683312/formula-to-calculate-difference-between-two-dates
const daysInYear = (isoString) => {
  const fragments = toFragments(isoString);
  const month = fragments.month <= 2 ? fragments.month + 12 : fragments.month;
  const year = fragments.month <= 2 ? fragments.year - 1 : fragments.year;

  const daysOfYear = 365 * year + floor(year/4) - floor(year/100) + floor(year/400);
  const daysOfMonth = floor((153 * month + 8)/5);

  return daysOfYear + daysOfMonth + fragments.day;
};

export const daysBetween = (from, to) => {
  const daysFrom = containsDateComponent(from) ? daysInYear(from) : 0;
  const daysTo = containsDateComponent(to) ? daysInYear(to) : 0;

  return daysTo - daysFrom;
};

export const microsecondsBetween = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);

  const microsecondsBetweenDays = Math.abs(daysBetween(from, to) * ONE_REGULAR_DAY);

  return Object.keys(TIME_UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = TIME_UNITS[unit];
    return totalSeconds + (valueToBeAdded * multiplier);
  }, microsecondsBetweenDays);
};

export const millisecondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_MILLISECOND;
export const secondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_SECOND;
export const minutesBetween = (from, to) => microsecondsBetween(from, to) / ONE_MINUTE;
export const hoursBetween = (from, to) => microsecondsBetween(from, to) / ONE_HOUR;

export const datesBetween = (from, to, dates = []) => {
  const fromWithoutTimeComponent = removeTimeComponent(from);
  const toWithoutTimeComponent = removeTimeComponent(to);

  const newDates = !isEmpty(fromWithoutTimeComponent)
    ? [...dates, fromWithoutTimeComponent]
    : [...dates];

  if(fromWithoutTimeComponent === toWithoutTimeComponent) { return newDates; }

  const direction = fromWithoutTimeComponent < toWithoutTimeComponent ? 1 : -1;
  const nextFrom = addDays(fromWithoutTimeComponent, direction);
  return datesBetween(nextFrom, toWithoutTimeComponent, newDates);
};
