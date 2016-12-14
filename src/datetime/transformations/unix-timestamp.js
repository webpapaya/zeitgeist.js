import { addSeconds, secondsBetween } from '../index';

// TODO: fix wrong unix timestamp
export const fromUnixTimestamp = (unixTimestamp) =>
  addSeconds(unixTimestamp, '1970-01-01T00:00:00');

export const toUnixTimestamp = (isoDatetime) =>
  secondsBetween(isoDatetime, '1970-01-01T00:00:00');

