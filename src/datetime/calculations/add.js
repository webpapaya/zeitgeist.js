import { curry, pipe } from '../../utils';
import { toFragments as toDurationFragments } from '../../duration/index';

import {
  toFragments,
  toIso,
  fromJulianDay,
  toJulianDay,
  containsTimeComponent,
  removeTimeComponent,
  isValid,
  getTimezone,
} from '../index';

import {
  INVALID_DATETIME,
  SECONDS_IN_REGULAR_DAY,
  MINUTES_IN_REGULAR_DAY,
  HOURS_IN_REGULAR_DAY,
} from '../constants';

const validateAndCurry = (fn) => curry((amount, isoDatetime) =>
  isValid(isoDatetime) ? fn(amount, isoDatetime) : INVALID_DATETIME);

export const addDuration = validateAndCurry((isoDuration, isoDatetime) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return pipe(
    addDays(days),
    addMonths(months),
    addYears(years),
    addHours(hours),
    addMinutes(minutes),
    addSeconds(seconds),
  )(isoDatetime);
});

export const addSeconds = validateAndCurry((seconds, isoDatetime) =>
  addDays(seconds / SECONDS_IN_REGULAR_DAY, isoDatetime));

export const addMinutes = validateAndCurry((minutes, isoDatetime) =>
  addDays(minutes / MINUTES_IN_REGULAR_DAY, isoDatetime));

export const addHours = validateAndCurry((hours, isoDatetime) =>
  addDays(hours / HOURS_IN_REGULAR_DAY, isoDatetime));

export const addDays = validateAndCurry((days, isoDatetime) => {
  const timezone = getTimezone(isoDatetime);
  const calculatedIsoString = fromJulianDay(toJulianDay(isoDatetime) + days);

  const withoutTimeComponent = containsTimeComponent(isoDatetime)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);

  return timezone
    ? withoutTimeComponent + timezone
    : withoutTimeComponent;
});

export const addMonths = validateAndCurry((months, isoDatetime) => {
  const timezone = getTimezone(isoDatetime);
  const fragments = toFragments(isoDatetime);
  const calculatedIsoString = toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });

  const withoutTimeComponent = containsTimeComponent(isoDatetime)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);

  return timezone
    ? withoutTimeComponent + timezone
    : withoutTimeComponent;
});

export const addYears = validateAndCurry((years, isoDatetime) => {
  const timezone = getTimezone(isoDatetime);
  const fragments = toFragments(isoDatetime);
  const calculatedIsoString = toIso({ ...fragments, year: fragments.year + years });

  const withoutTimeComponent = containsTimeComponent(isoDatetime)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);

  return timezone
    ? withoutTimeComponent + timezone
    : withoutTimeComponent;
});
