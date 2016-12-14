import { curry, pipe } from '../../utils';
import { toFragments as toDurationFragments } from '../../duration/index';

import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from './add.internal';

export const subtractDuration = curry((isoDuration, isoDatetime) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return pipe(
    addDays(days * -1),
    addMonths(months * -1),
    addYears(years * -1),
    addHours(hours * -1),
    addMinutes(minutes * -1),
    addSeconds(seconds * -1),
  )(isoDatetime);
});

export const subtractSeconds = (seconds, isoDatetime) =>
  addSeconds(seconds * -1, isoDatetime);

export const subtractMinutes = (minutes, isoDatetime) =>
  addMinutes(minutes * -1, isoDatetime);

export const subtractHours = (hours, isoDatetime) =>
  addHours(hours * -1, isoDatetime);

export const subtractDays = (days, isoDatetime) =>
  addDays(days * -1, isoDatetime);

export const subtractMonths = (months, isoDatetime) =>
  addMonths(months * -1, isoDatetime);

export const subtractYears = (years, isoDatetime) =>
  addYears(years * -1, isoDatetime);
