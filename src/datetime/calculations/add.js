import { curry, pipe } from '../../utils';
import { toFragments as toDurationFragments } from '../../duration/index';

import {
  toFragments,
  toIso,
  fromJulianDay,
  toJulianDay,
  containsTimeComponent,
  removeTimeComponent,
} from '../index';

import {
  SECONDS_IN_REGULAR_DAY,
  MINUTES_IN_REGULAR_DAY,
  HOURS_IN_REGULAR_DAY,
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

export const addSeconds = curry((seconds, isoDatetime) =>
  addDays(seconds / SECONDS_IN_REGULAR_DAY, isoDatetime));

export const addMinutes = curry((minutes, isoDatetime) =>
  addDays(minutes / MINUTES_IN_REGULAR_DAY, isoDatetime));

export const addHours = curry((hours, isoDatetime) =>
  addDays(hours / HOURS_IN_REGULAR_DAY, isoDatetime));

export const addDays = curry((days, isoDatetime) => {
  const calculatedIsoString = fromJulianDay(toJulianDay(isoDatetime) + days);

  return containsTimeComponent(isoDatetime)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
});

export const addMonths = curry((months, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  const calculatedIsoString = toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });

  return containsTimeComponent(isoDatetime)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
});

export const addYears = curry((years, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, year: fragments.year + years });
});
