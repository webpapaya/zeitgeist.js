import { toFragments, containsTimezone, getTimezone } from './index';
import { compose } from './../utils';
import {
  INVALID_DATETIME,

  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_REGULAR_DAY,

} from './constants';

import isValid from './is-valid';

const floor = (value) => Math.floor(value);
const daysSinceEpoch = ({ year: _year, month: m, day: d }) => {
  const year = m <= 2
      ? _year - 1
      : _year
    ;

  const era = floor((year >= 0
        ? year
        : year - 399
    ) / 400);

  const yearOfEra = year - era * 400;
  const dayOfYear = floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const dayOfEra = yearOfEra * 365 + floor(yearOfEra / 4) - floor(yearOfEra / 100) + dayOfYear;

  return era * 146097 + dayOfEra - 719468;
};

const isFloat = (value) => !isNaN(value) && value.toString().indexOf('.') !== -1;

const getMillisecondsFromSeconds = (seconds) => isFloat(seconds)
  ? parseInt(`${(seconds)}0000000`.replace(/\d*\./, '0').slice(0, 7), 10)
  : 0;

const calculateTimezoneOffset = (isoDatetime) => {
  if (!containsTimezone(isoDatetime)) { return 0; }

  const timezoneOffset = getTimezone(isoDatetime);

  if (timezoneOffset === 'Z') { return 0; }

  const sign = timezoneOffset[0];
  const [hours, minutes] = timezoneOffset
    .slice(1)
    .split(':')
    .map((unit) => parseInt(unit))
    .map((unit) => sign === '-' ? unit : unit * -1);

  return hours * ONE_HOUR + minutes * ONE_MINUTE;
};

export default (isoDatetime) => {
  if (!isValid(isoDatetime)) { return INVALID_DATETIME; }

  const fragments = toFragments(isoDatetime);
  const days = daysSinceEpoch(fragments);
  const milliseconds = getMillisecondsFromSeconds(fragments.second);

  return compose(
    (sum) => sum + days * ONE_REGULAR_DAY,
    (sum) => sum + (fragments.hour || 0) * ONE_HOUR,
    (sum) => sum + (fragments.minute || 0) * ONE_MINUTE,
    (sum) => sum + floor((fragments.second || 0)) * ONE_SECOND,
    (sum) => sum + milliseconds,
    (sum) => sum + calculateTimezoneOffset(isoDatetime),
  )(0);
};
