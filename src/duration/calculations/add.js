import { UNIT_NAMES, INVALID_DURATION } from '../constants';

import {
  toIso,
  toFragments,
  isValid,
} from '../index';

import { curry } from '../../utils';

const curryAndValidate = (fn) => curry((amount, isoDuration) => isValid(isoDuration)
  ? fn(amount, isoDuration)
  : INVALID_DURATION
);

const addUnit = (isoDuration, amount, unit) => {
  const fragments = toFragments(isoDuration);
  fragments[unit] += amount;
  return toIso(fragments);
};

export const addMilliseconds = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount / (10 ** 3), UNIT_NAMES.seconds));

export const addMicroseconds = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount / (10 ** 6), UNIT_NAMES.seconds));

export const addSeconds = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.seconds));

export const addMinutes = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.minutes));

export const addHours = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.hours));

export const addDays = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.days));

export const addWeeks = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.weeks));

export const addMonths = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.months));

export const addYears = curryAndValidate((amount, isoDuration) =>
  addUnit(isoDuration, amount, UNIT_NAMES.years));
