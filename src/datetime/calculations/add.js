import { curry, pipe } from 'ramda';
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

export const addDuration = curry((isoDuration, isoString) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return pipe(
    addDays(days),
    addMonths(months),
    addYears(years),
    addHours(hours),
    addMinutes(minutes),
    addSeconds(seconds),
  )(isoString);
});

export const addSeconds = curry((seconds, isoString) =>
  addDays(seconds / SECONDS_IN_REGULAR_DAY, isoString));

export const addMinutes = curry((minutes, isoString) =>
  addDays(minutes / MINUTES_IN_REGULAR_DAY, isoString));

export const addHours = curry((hours, isoString) =>
  addDays(hours / HOURS_IN_REGULAR_DAY, isoString));

export const addDays = curry((days, isoString) => {
  const calculatedIsoString = fromJulianDay(toJulianDay(isoString) + days);

  return containsTimeComponent(isoString)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
});

export const addMonths = curry((months, isoString) => {
  const fragments = toFragments(isoString);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
});

export const addYears = curry((years, isoStringOrFragments) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
});
