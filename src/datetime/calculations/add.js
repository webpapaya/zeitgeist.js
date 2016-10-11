import { compose } from '../../utils';
import {
  toFragments as toDurationFragments
} from '../../duration/index';

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

export const addDuration = (isoString, isoDuration) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  const _addMonths = (months) => (isoString) => addMonths(isoString, months);
  const _addYears = (years) => (isoString) => addYears(isoString, years);
  const _addDays = (days) => (isoString) => addDays(isoString, days);
  const _addHours = (hours) => (isoString) => addHours(isoString, hours);
  const _addMinutes = (minutes) => (isoString) => addMinutes(isoString, minutes);
  const _addSeconds = (seconds) => (isoString) => addSeconds(isoString, seconds);

  return compose(
    _addDays(days),
    _addMonths(months),
    _addYears(years),
    _addHours(hours),
    _addMinutes(minutes),
    _addSeconds(seconds),
  )(isoString);
};

export const addSeconds = (isoString, seconds) =>
  addDays(isoString, seconds / SECONDS_IN_REGULAR_DAY);

export const addMinutes = (isoString, minutes) =>
  addDays(isoString, minutes / MINUTES_IN_REGULAR_DAY);

export const addHours = (isoString, hours) =>
  addDays(isoString, hours / HOURS_IN_REGULAR_DAY);

export const addDays = (isoString, days) => {
  const calculatedIsoString = fromJulianDay(toJulianDay(isoString) + days);

  return containsTimeComponent(isoString)
    ? calculatedIsoString
    : removeTimeComponent(calculatedIsoString);
};

export const addMonths = (isoString, months) => {
  const fragments = toFragments(isoString);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
};

export const addYears = (isoStringOrFragments, years) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
};
