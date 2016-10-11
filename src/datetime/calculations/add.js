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
  const { years } = toDurationFragments(isoDuration);
  return addYears(isoString, years);
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
