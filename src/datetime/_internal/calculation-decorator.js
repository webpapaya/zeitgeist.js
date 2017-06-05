import { curry } from '../../utils';
import { INVALID_DATETIME } from '../constants';
import isValid from '../is-valid';
import dropTimezone from './drop-timezone';
import getTimezoneOffset from '../get-timezone-offset';

import { toIso } from '../transformations/iso-timestamp';
import { applyFormat } from '../format';

const calculationDecorator = (fn) => curry((amount, isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }

  const timezone = getTimezoneOffset(isoDateTime) || '';
  const dateTimeWithoutTimezone = dropTimezone(isoDateTime);

  const result = `${toIso(fn(amount, dateTimeWithoutTimezone))}${timezone}`;
  return applyFormat(isoDateTime, result);
});

export default calculationDecorator;
