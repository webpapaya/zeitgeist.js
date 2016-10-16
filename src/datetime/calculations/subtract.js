import { curry, pipe } from '../../utils';
import { toFragments as toDurationFragments } from '../../duration/index';

import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

export const subtractDuration = curry((isoDuration, isoString) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return pipe(
    addDays(days * -1),
    addMonths(months * -1),
    addYears(years * -1),
    addHours(hours * -1),
    addMinutes(minutes * -1),
    addSeconds(seconds * -1),
  )(isoString);
});

export const subtractSeconds = curry((seconds, isoString) =>
  addSeconds(seconds * -1, isoString));

export const subtractMinutes = curry((minutes, isoString) =>
  addMinutes(minutes * -1, isoString));

export const subtractHours = curry((hours, isoString) =>
  addHours(hours * -1, isoString));

export const subtractDays = curry((days, isoString) =>
  addDays(days * -1, isoString));

export const subtractMonths = curry((months, isoString) =>
  addMonths(months * -1, isoString));

export const subtractYears = curry((years, isoString) =>
  addYears(years * -1, isoString));
