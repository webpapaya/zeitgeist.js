import { addSeconds, secondsBetween } from '../index';

export const fromUnixTimestamp = (unixTimestamp) =>
  addSeconds('1700-01-01T00:00:00', unixTimestamp);

export const toUnixTimestamp = (isoString) =>
  secondsBetween(isoString, '1700-01-01T00:00:00');
