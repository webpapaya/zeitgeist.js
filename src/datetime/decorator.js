import { INVALID_DATETIME } from './constants';
import { getTimezone } from './getters';
import { applyFormat } from './format';
import { curry } from '../utils';
import { toIso, toFragments, normalize } from './index';

import isValid from './is-valid';

export const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

export const roundDecorator = (fn) => (_isoDateTime) => {
  const isoDateTime = toIso(_isoDateTime);
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }
  const timezone = getTimezone(isoDateTime) || '';

  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);

  const result = applyFormat(dateTimeWithoutTimezone, fn(dateTimeWithoutTimezone));
  return `${result}${timezone}`;
};

export const fragmentsRoundDecorator = (fn) => (_isoDateTime) => {
  const isoDateTime = toIso(normalize(_isoDateTime));
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }

  const timezone = getTimezone(isoDateTime) || '';

  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);
  const fragments = toFragments(dateTimeWithoutTimezone);

  const result = applyFormat(dateTimeWithoutTimezone, toIso(fn(fragments)));
  return `${result}${timezone}`;
};
