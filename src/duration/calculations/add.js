import { UNIT_NAMES, INVALID_DURATION } from '../constants';

import {
  toIso,
  toFragments,
  isValid,
} from '../index';

import { curry } from '../../utils';

const curryAndValidate = (fn) => curry((amount, isoString) => isValid(isoString)
  ? fn(amount, isoString)
  : INVALID_DURATION
);

const addUnit = (isoString, amount, unit) => {
  const fragments = toFragments(isoString);
  fragments[unit] += amount;
  return toIso(fragments);
};

export const addMilliseconds = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount / (10 ** 3), UNIT_NAMES.seconds));

export const addMicroseconds = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount / (10 ** 6), UNIT_NAMES.seconds));

export const addSeconds = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.seconds));

export const addMinutes = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.minutes));

export const addHours = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.hours));

export const addDays = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.days));

export const addWeeks = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.weeks));

export const addMonths = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.months));

export const addYears = curryAndValidate((amount, isoString) =>
  addUnit(isoString, amount, UNIT_NAMES.years));
