import { curry } from '../utils';
import { dropTimezone } from './index';

const setTimezoneOffset = curry((timezoneOffset, isoDatetime) => {
  const dateTimeWithoutOffset = dropTimezone(isoDatetime);
  return `${dateTimeWithoutOffset}${timezoneOffset}`;
});

export default setTimezoneOffset;
