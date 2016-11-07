import {
  TIME_DESIGNATOR,
  DURATION_DESIGNATOR,
  UNITS,
} from './constants';

const charsBetween = (string, start, end) =>
  string.substring(string.lastIndexOf(start) + 1, string.lastIndexOf(end));

const containsTimeDesignator = (string) =>
  string.lastIndexOf(TIME_DESIGNATOR) === -1;

const extractTimeComponents = (isoDuration) =>
  isoDuration.split(TIME_DESIGNATOR)[1] || '';

const extractDateComponents = (isoDuration) => {
  if (containsTimeDesignator(isoDuration)) { return isoDuration.replace(DURATION_DESIGNATOR, ''); }
  return charsBetween(isoDuration, DURATION_DESIGNATOR, TIME_DESIGNATOR);
};

const findUnit = (stringComponent, unit) => {
  const matchedUnit = stringComponent
    .toUpperCase()
    .match(new RegExp(`[+,-]?[0-9]+(\\.[0-9]+)?${unit}`));

  if (!matchedUnit) { return 0; }
  return parseFloat(matchedUnit[0].slice(0, -1));
};

const findTimeUnit = (unit, isoDuration) => {
  const timeComponent = extractTimeComponents(isoDuration || '');
  return findUnit(timeComponent, unit);
};

const findDateUnit = (unit, isoDuration) => {
  const dateComponent = extractDateComponents(isoDuration || '');
  return findUnit(dateComponent, unit);
};

export const removeDateComponent = (isoDuration) =>
  `${DURATION_DESIGNATOR}${TIME_DESIGNATOR}${extractTimeComponents(isoDuration)}`;

export const removeTimeComponent = (isoDuration) =>
  `${DURATION_DESIGNATOR}${extractDateComponents(isoDuration)}`;

export const findSeconds = (isoDuration) => findTimeUnit(UNITS.seconds, isoDuration);
export const findMinutes = (isoDuration) => findTimeUnit(UNITS.minutes, isoDuration);
export const findHours = (isoDuration) => findTimeUnit(UNITS.hours, isoDuration);

export const findDays = (isoDuration) => findDateUnit(UNITS.days, isoDuration);
export const findWeeks = (isoDuration) => findDateUnit(UNITS.weeks, isoDuration);
export const findMonths = (isoDuration) => findDateUnit(UNITS.months, isoDuration);
export const findYears = (isoDuration) => findDateUnit(UNITS.years, isoDuration);
