import { separateDateAndTimeComponents, toFragments } from './fragments';
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

export { toFragments } from './fragments';
export { toIso, toIsoDate, toIsoTime } from './iso-timestamp';
export { fromJulianDay, toJulianDay } from './julian-day';
export { fromUnixTimestamp, toUnixTimestamp } from './unix-timestamp';
export { fromJsDate, toJsDate } from './js-date';
