import { curry, pipe } from '../../utils';
import { toFragments as toDurationFragments } from '../../duration/index';

import toUnixMicroseconds from '../to-unix-microseconds';
import fromUnixMicroseconds from '../from-unix-microseconds';

import {
  toFragments,
  toIso,
} from '../index';

import {
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

const createAddUnit = (unit) => curry((amount, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + amount * unit,
  fromUnixMicroseconds,
)(isoDatetime));

export const addMilliseconds = createAddUnit(ONE_MILLISECOND);
export const addSeconds = createAddUnit(ONE_SECOND);
export const addMinutes = createAddUnit(ONE_MINUTE);
export const addHours = createAddUnit(ONE_HOUR);
export const addDays = createAddUnit(ONE_REGULAR_DAY);


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
