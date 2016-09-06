import { toFragments } from '../index';
const ONE_MICROSECOND = 1;
const ONE_MILLISECOND = 1000 * ONE_MICROSECOND;
const ONE_SECOND = 1000 * ONE_MILLISECOND;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

const UNITS = {
  hour: ONE_HOUR,
  minute: ONE_MINUTE,
  second: ONE_SECOND
};

const readUnit = (fragments, unit) => (fragments[unit] || 0);

export const microsecondsBetween = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);

  return Object.keys(UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = UNITS[unit];
    return totalSeconds + ((valueToBeAdded * multiplier));
  }, 0);
};

export const millisecondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_MILLISECOND;
export const secondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_SECOND;
export const minutesBetween = (from, to) => microsecondsBetween(from, to) / ONE_MINUTE;
export const hoursBetween = (from, to) => microsecondsBetween(from, to) / ONE_HOUR;
