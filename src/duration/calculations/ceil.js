import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,

  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorWeek,
  floorMonth,
  floorYear,
} from '../index';

export const ceilSecond = (isoDuration) => floorSecond(addSeconds(1, isoDuration));
export const ceilMinute = (isoDuration) => floorMinute(addMinutes(1, isoDuration));
export const ceilHour = (isoDuration) => floorHour(addHours(1, isoDuration));
export const ceilDay = (isoDuration) => floorDay(addDays(1, isoDuration));
export const ceilWeek = (isoDuration) => floorWeek(addWeeks(1, isoDuration));
export const ceilMonth = (isoDuration) => floorMonth(addMonths(1, isoDuration));
export const ceilYear = (isoDuration) => floorYear(addYears(1, isoDuration));
