import betweenDecorator from './_internal/between-decorator';
import { TIME_UNITS, ONE_REGULAR_DAY } from './constants';
import { toFragments } from './index';
import { isBefore } from './compare';
import { daysBetween } from './calculations/between.internal';

const readUnit = (fragments, unit) => (fragments[unit] || 0);

const differenceInMicroseconds = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);
  const microsecondsBetweenDays = Math.abs(daysBetween(from, to) * ONE_REGULAR_DAY);

  return Object.keys(TIME_UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = TIME_UNITS[unit];
    return totalSeconds + (valueToBeAdded * multiplier);
  }, microsecondsBetweenDays);
};

const microsecondsBetween = betweenDecorator((from, to) => isBefore(from, to)
  ? differenceInMicroseconds(to, from) * -1
  : differenceInMicroseconds(from, to));

export default microsecondsBetween;
