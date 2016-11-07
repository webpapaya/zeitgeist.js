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
} from './add';

import { curry } from '../../utils';

export const subtractMilliseconds = curry((amount, isoDuration) =>
  addMilliseconds(amount * -1, isoDuration));

export const subtractMicroseconds = curry((amount, isoDuration) =>
  addMicroseconds(amount * -1, isoDuration));

export const subtractSeconds = curry((amount, isoDuration) =>
  addSeconds(amount * -1, isoDuration));

export const subtractMinutes = curry((amount, isoDuration) =>
  addMinutes(amount * -1, isoDuration));

export const subtractHours = curry((amount, isoDuration) =>
  addHours(amount * -1, isoDuration));

export const subtractDays = curry((amount, isoDuration) =>
  addDays(amount * -1, isoDuration));

export const subtractWeeks = curry((amount, isoDuration) =>
  addWeeks(amount * -1, isoDuration));

export const subtractMonths = curry((amount, isoDuration) =>
  addMonths(amount * -1, isoDuration));

export const subtractYears = curry((amount, isoDuration) =>
  addYears(amount * -1, isoDuration));

