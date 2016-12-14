import { isValid } from '../validate';
import {
  fromUnixTimestamp as _fromUnixTimestamp,
  toUnixTimestamp as _toUnixTimestamp,
} from './unix-timestamp.internal';

export const fromUnixTimestamp = _fromUnixTimestamp;
export const toUnixTimestamp = (isoDateTime) => {
  if (!isValid(isoDateTime)) { return INVALID_DATETIME; }
  return _toUnixTimestamp(isoDateTime);
};
