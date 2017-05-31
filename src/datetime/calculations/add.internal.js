import { curry, pipe } from '../../utils';
import { toFragments as toDurationFragments } from '../../duration/index';

import toUnixMicroseconds from '../to-unix-microseconds';
import fromUnixMicroseconds from '../from-unix-microseconds';

import {
  toFragments,
  toIso,
} from '../index';

import {
  ONE_MICROSECOND,
  ONE_MILLISECOND,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_REGULAR_DAY,
} from '../constants';

export const addDuration = (isoDuration, isoDatetime) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return pipe(
    addDays(days),
    addMonths(months),
    addYears(years),
    addHours(hours),
    addMinutes(minutes),
    addSeconds(seconds),
  )(isoDatetime);
};

export const addMicroseconds = curry((microseconds, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + microseconds * ONE_MICROSECOND,
  fromUnixMicroseconds,
)(isoDatetime));

export const addMilliseconds = curry((milliseconds, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + milliseconds * ONE_MILLISECOND,
  fromUnixMicroseconds,
)(isoDatetime));

export const addSeconds = curry((seconds, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + seconds * ONE_SECOND,
  fromUnixMicroseconds,
)(isoDatetime));


export const addMinutes = curry((minutes, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + minutes * ONE_MINUTE,
  fromUnixMicroseconds,
)(isoDatetime));

export const addHours = curry((hours, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + hours * ONE_HOUR,
  fromUnixMicroseconds,
)(isoDatetime));


export const addDays = curry((days, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + days * ONE_REGULAR_DAY,
  fromUnixMicroseconds,
)(isoDatetime));

export const addMonths = curry((months, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
});

export const addYears = curry((years, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, year: fragments.year + years });
});
