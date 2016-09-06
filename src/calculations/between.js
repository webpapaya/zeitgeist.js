import { toFragments, subtractDays } from '../index';
import {
  ONE_MILLISECOND,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  TIME_UNITS
} from '../constants';

const readUnit = (fragments, unit) => (fragments[unit] || 0);

export const microsecondsBetween = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);

  return Object.keys(TIME_UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = TIME_UNITS[unit];
    return totalSeconds + ((valueToBeAdded * multiplier));
  }, 0);
};

export const millisecondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_MILLISECOND;
export const secondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_SECOND;
export const minutesBetween = (from, to) => microsecondsBetween(from, to) / ONE_MINUTE;
export const hoursBetween = (from, to) => microsecondsBetween(from, to) / ONE_HOUR;

export const datesBetween = (from, to, dates = []) => {
  const newDates = [...dates, from];
  if(from === to) { return newDates; }
  return datesBetween(subtractDays(from, 1), to, newDates);
};
