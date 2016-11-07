import { validateFirstArg as validate } from '../validate';
import {
  toFragments,
  toIso,

  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,
  ceilWeek,

  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractMonths,
} from '../index';

export const endOfSecond = validate((isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, second: Math.floor(fragments.second) + 0.999999 });
});

export const endOfMinute = (isoDatetime) => endOfSecond(subtractSeconds(1, ceilMinute(isoDatetime)));
export const endOfHour = (isoDatetime) => endOfMinute(subtractMinutes(1, ceilHour(isoDatetime)));
export const endOfDay = (isoDatetime) => endOfHour(subtractHours(1, ceilDay(isoDatetime)));
export const endOfMonth = (isoDatetime) => endOfDay(subtractDays(1, ceilMonth(isoDatetime)));
export const endOfYear = (isoDatetime) => endOfMonth(subtractMonths(1, ceilYear(isoDatetime)));
export const endOfWeek = (isoDatetime) => endOfDay(subtractDays(1, ceilWeek(isoDatetime)));
