import {
  toFragments,
  toIso,
  fromJulianDay,
  toJulianDay,
  containsTimeComponent,
  removeTimeComponent,
} from '../index';

export const addSeconds = (isoString, seconds) => addDays(isoString, seconds / 86400);
export const addMinutes = (isoString, minutes) => addDays(isoString, minutes / 1440);
export const addHours = (isoString, hours) => addDays(isoString, hours / 24);

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
