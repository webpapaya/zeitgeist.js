import {
  toFragments,
  toIso,

  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,

  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractMonths,
  subtractYears,
} from '../index';

export const endOfSecond = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) + 0.999999 });
};

export const endOfMinute = (isoString) => endOfSecond(subtractSeconds(ceilMinute(isoString), 1));
export const endOfHour = (isoString) => endOfMinute(subtractMinutes(ceilHour(isoString), 1));
export const endOfDay = (isoString) => endOfHour(subtractHours(ceilDay(isoString), 1));
export const endOfMonth = (isoString) => endOfDay(subtractDays(ceilMonth(isoString), 1));
export const endOfYear = (isoString) => endOfMonth(subtractMonths(ceilYear(isoString), 1));



