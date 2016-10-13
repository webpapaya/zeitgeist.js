import {
  UNIT_NAMES,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from './constants';

import {
  toIso,
  toFragments,
  asMicroseconds,
  removeDateComponent,
} from './index';

export const normalize = (isoString) => {
  const fragments = toFragments(isoString);

  const microseconds = asMicroseconds(removeDateComponent(isoString));
  const hours = Math.floor(microseconds / ONE_HOUR);
  const minutes = Math.floor((microseconds - hours * ONE_HOUR) / ONE_MINUTE);
  const seconds = ((microseconds - minutes * ONE_MINUTE) - (hours * ONE_HOUR)) / ONE_SECOND;

  return toIso({
    ...fragments,
    hours,
    minutes,
    seconds,
  });
};

const addUnit = (isoString, amount, unit) => {
  const fragments = toFragments(isoString);
  fragments[unit] += amount;
  return toIso(fragments);
};

export const addMilliseconds = (amount, isoString) =>
  addUnit(isoString, amount / (10 ** 3), UNIT_NAMES.seconds);

export const addMicroseconds = (amount, isoString) =>
  addUnit(isoString, amount / (10 ** 6), UNIT_NAMES.seconds);

export const addSeconds = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.seconds);
export const addMinutes = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.minutes);
export const addHours = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.hours);
export const addDays = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.days);
export const addWeeks = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.weeks);
export const addMonths = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.months);
export const addYears = (amount, isoString) => addUnit(isoString, amount, UNIT_NAMES.years);

export const subtractMilliseconds = (amount, isoString) => addMilliseconds(amount * -1, isoString);
export const subtractMicroseconds = (amount, isoString) => addMicroseconds(amount * -1, isoString);
export const subtractSeconds = (amount, isoString) => addSeconds(amount * -1, isoString);
export const subtractMinutes = (amount, isoString) => addMinutes(amount * -1, isoString);
export const subtractHours = (amount, isoString) => addHours(amount * -1, isoString);
export const subtractDays = (amount, isoString) => addDays(amount * -1, isoString);
export const subtractWeeks = (amount, isoString) => addWeeks(amount * -1, isoString);
export const subtractMonths = (amount, isoString) => addMonths(amount * -1, isoString);
export const subtractYears = (amount, isoString) => addYears(amount * -1, isoString);
