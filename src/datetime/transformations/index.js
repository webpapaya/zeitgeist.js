import { separateDateAndTimeComponents, toFragments } from './fragments';
import { leftPad } from '../../utils';
import { addDuration, containsTimezone } from '../index';

export const removeTimeComponent = (isoDatetime) =>
  separateDateAndTimeComponents(isoDatetime).dateComponent;

export const removeDateComponent = (isoDatetime) =>
  separateDateAndTimeComponents(isoDatetime).timeComponent;

export const toUtc = (isoDatetime) => {
  const { timezoneOffset } = toFragments(isoDatetime);
  return addDuration(timezoneOffset, isoDatetime);
};

export const toFloat = (isoDatetime) => {
  const fragments = containsTimezone(isoDatetime)
    ? toFragments(toUtc(isoDatetime))
    : toFragments(isoDatetime);

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
export { fromJsDate, toJsDate, now } from './js-date';
