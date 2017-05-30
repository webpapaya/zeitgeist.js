import { toFragments, toIso } from './index';
import { compose } from './../utils';
import { isValid } from './validate';
import { INVALID_DATETIME } from './constants';

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
  ? parseInt(`${(seconds)}0000`.replace(/\d*\./, '0').slice(0, 4), 10)
  : 0;

const toUnixTimestamp = (isoDatetime) => {
  if (!isValid(isoDatetime)) { return INVALID_DATETIME; }

  const fragments = toFragments(isoDatetime);
  const days = daysSinceEpoch(fragments);
  const milliseconds = getMillisecondsFromSeconds(fragments.second);

  return compose(
    (sum) => sum + days * 24 * 60 * 60 * 1000,
    (sum) => sum + (fragments.hour || 0) * 60 * 60 * 1000,
    (sum) => sum + (fragments.minute || 0) * 60 * 1000,
    (sum) => sum + floor((fragments.second || 0)) * 1000,
    (sum) => sum + milliseconds,
  )(0);
};

export default toUnixTimestamp;
