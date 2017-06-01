import { INVALID_DATETIME } from './constants';
import { getTimezone } from './getters';
import { applyFormat } from './format';
import { isValid } from './validate';
import { curry } from '../utils';
import { containsDateComponent, toUtc, toIso, toFragments } from './index';

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

export const fragmentsRoundDecorator = (fn) => (_isoDateTime) => {
  const isoDateTime = toIso(_isoDateTime);
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }

  const timezone = getTimezone(isoDateTime) || '';

  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);
  const fragments = toFragments(dateTimeWithoutTimezone);

  const result = applyFormat(dateTimeWithoutTimezone, toIso(fn(fragments)));
  return `${result}${timezone}`;
};

export const calculationDecorator = (fn) => curry((amount, isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }

  const timezone = getTimezone(isoDateTime) || '';
  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);

  const result = `${toIso(fn(amount, dateTimeWithoutTimezone))}${timezone}`;
  return applyFormat(isoDateTime, result);
});

export const betweenDecorator = (fn) => curry((from, to) => {
  return fn(
    dropTimezone(containsDateComponent(from) ? toUtc(from) : from),
    dropTimezone(containsDateComponent(to) ? toUtc(to) : to)
  );
});
