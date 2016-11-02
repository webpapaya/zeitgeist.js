import { INVALID_DATE } from '../constants';
import {
  toIso,
  toFragments,
  getWeekday,
  subtractDays,
  isValid,
} from '../index';

import { pipe } from '../../utils';

const validate = (fn) => (isoString) => isValid(isoString)
  ? fn(isoString)
  : INVALID_DATE;

const parseArgAsFragments = (fn) => validate((isoString) =>
  pipe(toFragments, fn, toIso)(isoString));

export const floorSecond = parseArgAsFragments((fragments) =>
  ({ ...fragments, second: Math.floor(fragments.second) }));

export const floorMinute = parseArgAsFragments((fragments) =>
  ({ ...fragments, second: 0 }));

export const floorHour = parseArgAsFragments((fragments) =>
  ({ ...fragments, minute: 0, second: 0 }));

export const floorWeek = validate((isoString) => {
  const weekDay = getWeekday(isoString);
  return floorDay(subtractDays(weekDay - 1, isoString));
});

export const floorDay = parseArgAsFragments((fragments) =>
  ({ ...fragments, hour: 0, minute: 0, second: 0 }));

export const floorMonth = parseArgAsFragments((fragments) =>
  ({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 }));

export const floorYear = parseArgAsFragments((fragments) =>
  ({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 }));
