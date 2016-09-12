import { ONE_SECOND, ONE_MINUTE, ONE_HOUR, ONE_REGULAR_DAY } from '../constants';
import { daysBetween } from '../index';
import { leftPad } from '../utils';
import { leapMicrosecondsBetween } from '../calculations/index';
import { separateDateAndTimeComponents, toFragments } from './to-fragments';

export const removeTimeComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).dateComponent;

export const removeDateComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).timeComponent;

const REFERENCE_DATE = '0000-01-01T00:00:00';
export const toMicroseconds = (isoString) => {
  const days = daysBetween(REFERENCE_DATE, isoString);
  const { second = 0, minute = 0, hour = 0 } = toFragments(isoString);
  const leapMicroseconds = leapMicrosecondsBetween(isoString, REFERENCE_DATE);
  return (days * ONE_REGULAR_DAY) + (second * ONE_SECOND) + (minute * ONE_MINUTE) + (hour * ONE_HOUR) - leapMicroseconds;
};

export const toFloat = (isoString) => {
  const fragments = toFragments(isoString);

  return parseFloat([
    leftPad(fragments.year),
    leftPad(fragments.month),
    leftPad(fragments.day),
    leftPad(fragments.hour),
    leftPad(fragments.minute),
    leftPad(fragments.second),
  ].join(''));
};

export { toFragments } from './to-fragments';
export { toIso, toIsoDate, toIsoTime } from './to-iso';
