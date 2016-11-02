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

  isValid,
} from '../index';

const validate = (fn) => (isoString) => isValid(isoString)
  ? fn(isoString)
  : 'Invalid Date';

export const endOfSecond = validate((isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) + 0.999999 });
});

export const endOfMinute = (isoString) => endOfSecond(subtractSeconds(1, ceilMinute(isoString)));
export const endOfHour = (isoString) => endOfMinute(subtractMinutes(1, ceilHour(isoString)));
export const endOfDay = (isoString) => endOfHour(subtractHours(1, ceilDay(isoString)));
export const endOfMonth = (isoString) => endOfDay(subtractDays(1, ceilMonth(isoString)));
export const endOfYear = (isoString) => endOfMonth(subtractMonths(1, ceilYear(isoString)));
export const endOfWeek = (isoString) => endOfDay(subtractDays(1, ceilWeek(isoString)));
