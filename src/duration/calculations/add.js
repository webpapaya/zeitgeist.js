import { UNIT_NAMES } from '../constants';

import {
  toIso,
  toFragments,
  isValid,
} from '../index';

import { curry } from '../../utils';


const addUnit = (isoString, amount, unit) => {
  if (!isValid(isoString)) { return 'Invalid Duration'; }
  const fragments = toFragments(isoString);
  fragments[unit] += amount;
  return toIso(fragments);
};

export const addMilliseconds = curry((amount, isoString) =>
  addUnit(isoString, amount / (10 ** 3), UNIT_NAMES.seconds));

export const addMicroseconds = curry((amount, isoString) =>
  addUnit(isoString, amount / (10 ** 6), UNIT_NAMES.seconds));

export const addSeconds = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.seconds));

export const addMinutes = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.minutes));

export const addHours = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.hours));

export const addDays = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.days));

export const addWeeks = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.weeks));

export const addMonths = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.months));

export const addYears = curry((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.years));
