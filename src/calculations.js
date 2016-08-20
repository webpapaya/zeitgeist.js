import { toIso } from './transformations';
import {
  findSeconds,
  findHours,
  findMinutes,
  findDays,
  findWeeks,
  findMonths,
  findYears,
} from './finders';

import { UNIT_NAMES } from './constants';

const asFragments = (isoString) => {
  return {
    seconds: findSeconds(isoString),
    minutes: findMinutes(isoString),
    hours: findHours(isoString),
    days: findDays(isoString),
    weeks: findWeeks(isoString),
    months: findMonths(isoString),
    years: findYears(isoString),
  };
};

const addUnit = (isoString, amount, unit) => {
  const fragments = asFragments(isoString);
  fragments[unit] += amount;
  return toIso(fragments);
};

export const addMillisecond = (isoString, amount) =>
  addUnit(isoString, amount / (10 ** 3), UNIT_NAMES.seconds);

export const addMicrosecond = (isoString, amount) =>
  addUnit(isoString, amount / (10 ** 6), UNIT_NAMES.seconds);

export const addSeconds = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.seconds);
export const addMinutes = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.minutes);
export const addHours = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.hours);

export const addDays = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.days);
export const addWeeks = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.weeks);
export const addMonths = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.months);
export const addYears = (isoString, amount) => addUnit(isoString, amount, UNIT_NAMES.years);
