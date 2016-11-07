import { addSeconds, secondsBetween } from '../index';

export const fromUnixTimestamp = (unixTimestamp) =>
  addSeconds(unixTimestamp, '1700-01-01T00:00:00');

export const toUnixTimestamp = (isoDatetime) =>
  secondsBetween(isoDatetime, '1700-01-01T00:00:00');
