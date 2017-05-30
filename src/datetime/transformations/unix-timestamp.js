import { toFragments, toIso } from '../index';
import { compose } from '../../utils';
import { isValid } from '../validate';
import { INVALID_DATETIME } from '../constants';

const floor = (value) => Math.floor(value);
export const daysSinceEpoch = ({ year: _year, month: m, day: d }) => {
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

const isFloat = (value) => !isNaN(value) && value.toString().indexOf('.') != -1;

const getMillisecondsFromSeconds = (seconds) => isFloat(seconds)
  ? parseInt(`${(seconds)}0000`.replace(/\d*\./, '0').slice(0, 4))
  : 0;

export const toUnixTimestamp = (isoDatetime) => {
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

const calculateYearOfEpoch = (dayOfEpoch) => compose(
  (sum) => sum - floor(dayOfEpoch/1460),
  (sum) => sum + floor(dayOfEpoch/36524),
  (sum) => sum - floor(dayOfEpoch/146096),
  (sum) => floor(sum / 365),
)(dayOfEpoch);

const calculateDayOfYear = (dayOfEpoch, yearOfEpoch) => compose(
  (sum) => sum + 365 * yearOfEpoch,
  (sum) => sum + floor(yearOfEpoch/4),
  (sum) => sum - floor(yearOfEpoch/100),
  (sum) => dayOfEpoch - sum
)(0);

export const dayOfEpochToDate = (epochDay) => {
  const timestamp = floor(epochDay + 719468);
  const era = floor((timestamp >= 0
    ? timestamp
    : timestamp - 146096
  ) / 146097);

  const dayOfEpoch = timestamp - era * 146097;
  const yearOfEpoch = calculateYearOfEpoch(dayOfEpoch);
  const year = yearOfEpoch + era * 400;
  const dayOfYear = calculateDayOfYear(dayOfEpoch, yearOfEpoch);

  const mp = floor((5*dayOfYear + 2)/153);
  const day = dayOfYear - floor((153*mp+2)/5) + 1;
  const month = mp + (mp < 10 ? 3 : -9);

  return {
    year: month <= 2 ? year + 1 : year,
    month: month,
    day: day,
  };
};



const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

export const fromUnixTimestamp = (unixTimestamp) => {
  const epochDay = floor(unixTimestamp / (ONE_DAY));
  const { year, month, day } = dayOfEpochToDate(epochDay);

  const hour = compose(
    (sum) => sum - epochDay * ONE_DAY,
    (sum) => floor(sum / ONE_HOUR),
  )(unixTimestamp);

  const minute = compose(
    (sum) => sum - epochDay * ONE_DAY,
    (sum) => sum - hour * ONE_HOUR,
    (sum) => floor(sum / ONE_MINUTE),
  )(unixTimestamp);

  const second = compose(
    (sum) => sum - epochDay * ONE_DAY,
    (sum) => sum - hour * ONE_HOUR,
    (sum) => sum - minute * ONE_MINUTE,
    (sum) => sum / ONE_SECOND,
  )(unixTimestamp);

  return toIso({ year, month, day, hour, minute, second });
};
