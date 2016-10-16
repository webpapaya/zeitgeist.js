import {
  addMicroseconds,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from './calculations/add';

import {
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

import { curry } from '../utils';

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

export const subtractMilliseconds = curry((amount, isoString) =>
  addMilliseconds(amount * -1, isoString));

export const subtractMicroseconds = curry((amount, isoString) =>
  addMicroseconds(amount * -1, isoString));

export const subtractSeconds = curry((amount, isoString) =>
  addSeconds(amount * -1, isoString));

export const subtractMinutes = curry((amount, isoString) =>
  addMinutes(amount * -1, isoString));

export const subtractHours = curry((amount, isoString) =>
  addHours(amount * -1, isoString));

export const subtractDays = curry((amount, isoString) =>
  addDays(amount * -1, isoString));

export const subtractWeeks = curry((amount, isoString) =>
  addWeeks(amount * -1, isoString));

export const subtractMonths = curry((amount, isoString) =>
  addMonths(amount * -1, isoString));

export const subtractYears = curry((amount, isoString) =>
  addYears(amount * -1, isoString));

export {
  addMicroseconds,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from './calculations/add';
