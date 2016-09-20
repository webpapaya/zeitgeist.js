import { separateDateAndTimeComponents, toFragments } from './to-fragments';
import { leftPad } from '../utils';

export const removeTimeComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).dateComponent;

export const removeDateComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).timeComponent;

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
export { fromJulianDay, toJulianDay } from './julian-day';
