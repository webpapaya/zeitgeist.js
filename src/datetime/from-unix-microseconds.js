import { toIso } from './index';
import { compose } from './../utils';
import { ONE_SECOND, ONE_MINUTE, ONE_HOUR, ONE_DAY } from '../core/constants';

const floor = (value) => Math.floor(value);

const calculateYearOfEpoch = (dayOfEpoch) => compose(
  (sum) => sum - floor(dayOfEpoch / 1460),
  (sum) => sum + floor(dayOfEpoch / 36524),
  (sum) => sum - floor(dayOfEpoch / 146096),
  (sum) => floor(sum / 365),
)(dayOfEpoch);

const calculateDayOfYear = (dayOfEpoch, yearOfEpoch) => compose(
  (sum) => sum + 365 * yearOfEpoch,
  (sum) => sum + floor(yearOfEpoch / 4),
  (sum) => sum - floor(yearOfEpoch / 100),
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

  const mp = floor((5 * dayOfYear + 2) / 153);
  const day = dayOfYear - floor((153 * mp + 2) / 5) + 1;
  const month = mp + (mp < 10 ? 3 : -9);

  return {
    year: month <= 2 ? year + 1 : year,
    month: month,
    day: day,
  };
};

const fromUnixMicroseconds = (unixMicroseconds) => {
  const epochDay = floor(unixMicroseconds / ONE_DAY);
  const { year, month, day } = dayOfEpochToDate(epochDay);

  const hour = compose(
    (sum) => sum - epochDay * ONE_DAY,
    (sum) => floor(sum / ONE_HOUR),
  )(unixMicroseconds);

  const minute = compose(
    (sum) => sum - epochDay * ONE_DAY,
    (sum) => sum - hour * ONE_HOUR,
    (sum) => floor(sum / ONE_MINUTE),
  )(unixMicroseconds);

  const second = compose(
    (sum) => sum - epochDay * ONE_DAY,
    (sum) => sum - hour * ONE_HOUR,
    (sum) => sum - minute * ONE_MINUTE,
    (sum) => sum / ONE_SECOND,
  )(unixMicroseconds);

  return toIso({ year, month, day, hour, minute, second });
};

export default fromUnixMicroseconds;
