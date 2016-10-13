import { compose } from '../../utils';
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

const _addMonths = (months) => (isoString) => addMonths(months, isoString);
const _addYears = (years) => (isoString) => addYears(years, isoString);
const _addDays = (days) => (isoString) => addDays(days, isoString);
const _addHours = (hours) => (isoString) => addHours(hours, isoString);
const _addMinutes = (minutes) => (isoString) => addMinutes(minutes, isoString);
const _addSeconds = (seconds) => (isoString) => addSeconds(seconds, isoString);

export const addDuration = (isoString, isoDuration) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return compose(
    _addDays(days),
    _addMonths(months),
    _addYears(years),
    _addHours(hours),
    _addMinutes(minutes),
    _addSeconds(seconds),
  )(isoString);
};

export const addSeconds = (seconds, isoString) =>
  addDays(seconds / SECONDS_IN_REGULAR_DAY, isoString);

export const addMinutes = (minutes, isoString) =>
  addDays(minutes / MINUTES_IN_REGULAR_DAY, isoString);

export const addHours = (hours, isoString) =>
  addDays(hours / HOURS_IN_REGULAR_DAY, isoString);

export const addDays = (days, isoString) => {
  const calculatedIsoString = fromJulianDay(toJulianDay(isoString) + days);

  return containsTimeComponent(isoString)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
};

export const addMonths = (months, isoString) => {
  const fragments = toFragments(isoString);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
};

export const addYears = (years, isoStringOrFragments) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
};
