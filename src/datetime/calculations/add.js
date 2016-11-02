import { curry, pipe } from '../../utils';
import { INVALID_DATE } from '../constants';
import { toFragments as toDurationFragments } from '../../duration/index';
import { isValid } from '../index';

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

const validateAndCurry = (fn) => curry((amount, isoString) =>
  isValid(isoString) ? fn(amount, isoString) : INVALID_DATE);

export const addDuration = validateAndCurry((isoDuration, isoString) => {
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

export const addSeconds = validateAndCurry((seconds, isoString) =>
  addDays(seconds / SECONDS_IN_REGULAR_DAY, isoString));

export const addMinutes = validateAndCurry((minutes, isoString) =>
  addDays(minutes / MINUTES_IN_REGULAR_DAY, isoString));

export const addHours = validateAndCurry((hours, isoString) =>
  addDays(hours / HOURS_IN_REGULAR_DAY, isoString));

export const addDays = validateAndCurry((days, isoString) => {
  const calculatedIsoString = fromJulianDay(toJulianDay(isoString) + days);

  return containsTimeComponent(isoString)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
});

export const addMonths = validateAndCurry((months, isoString) => {
  const fragments = toFragments(isoString);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
});

export const addYears = validateAndCurry((years, isoStringOrFragments) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
});
