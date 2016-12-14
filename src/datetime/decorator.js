import { INVALID_DATETIME } from './constants';
import { getTimezone } from './getters';
import { applyFormat } from './format';
import { isValid } from './validate';
import { curry } from '../utils';

export const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

export const roundDecorator = (fn) => (isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }
  const timezone = getTimezone(isoDateTime) || '';

  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);

  const result = applyFormat(dateTimeWithoutTimezone, fn(dateTimeWithoutTimezone));
  return `${result}${timezone}`;
};

export const calculationDecorator = (fn) => curry((amount, isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }

  const timezone = getTimezone(isoDateTime) || '';
  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);

  const result = `${fn(amount, dateTimeWithoutTimezone)}${timezone}`;
  return applyFormat(isoDateTime, result);
});
