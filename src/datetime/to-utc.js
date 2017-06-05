import { pipe } from '../utils';
import { ONE_HOUR, ONE_MINUTE } from './constants';

import subtractMinutes from './subtract-minutes';
import setTimezoneOffset from './set-timezone-offset';

const timezoneOffsetToMinutes = (timezoneOffset) => {
  if (!timezoneOffset) { return 0; }
  const [hours, minutes] = timezoneOffset.split(':')
    .map((unit) => parseInt(unit));

  return (hours * ONE_HOUR + minutes * ONE_MINUTE) / ONE_MINUTE;
};

const getTimezoneOffsetInMinutes = (isoDatetime) => pipe(
  getTimezoneOffset,
  timezoneOffsetToMinutes,
)(isoDatetime);

const toUtc = (isoDatetime) => pipe(
  subtractMinutes(getTimezoneOffsetInMinutes(isoDatetime)),
  setTimezoneOffset('+00:00'),
)(isoDatetime);

export default toUtc;
