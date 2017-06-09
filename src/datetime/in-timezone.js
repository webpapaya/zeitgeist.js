import TIMEZONE_REGISTRY from './_internal/timezone-registry';

import { dropTimezone } from './index';
import { compose, curry } from '../utils';



import toUnixTimestamp from './to-unix-timestamp';
import subtractMinutes from './subtract-minutes';
import toUtc from './to-utc';

const minutesToTimezoneOffset = (offset) => {
  const hours = Math.floor(offset / 60);
  const minutes = offset - hours * 60;

  return hours > 0
    ? `-${leftPad(Math.abs(hours))}:${leftPad(minutes)}`
    : `+${leftPad(Math.abs(hours))}:${leftPad(minutes)}`
    ;
};

const setTimezoneOffset = curry((timezoneOffset, isoDatetime) => {
  const dateTimeWithoutOffset = dropTimezone(isoDatetime);
  return `${dateTimeWithoutOffset}${timezoneOffset}`;
});

const leftPad = (value) => `00${value}`.slice(-2);

const inTimezone = curry((timezoneName, isoDatetime) => {
  const zone = TIMEZONE_REGISTRY[timezoneName.toLowerCase()]; // TODO: handle not found zone
  const unixTimestamp = toUnixTimestamp(isoDatetime);

  const possibleOffsets = zone.filter(({ until }) => (until >= unixTimestamp && until !== null));
  const { offset } = possibleOffsets[0];

  const timezoneOffset = minutesToTimezoneOffset(offset);

  return compose(
    toUtc,
    setTimezoneOffset(timezoneOffset),
    subtractMinutes(offset)
  )(isoDatetime);
});

export default inTimezone;
