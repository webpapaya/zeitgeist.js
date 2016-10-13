import {
  getWeekday,

  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,

  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

export const ceilSecond = (isoString) => floorSecond(addSeconds(1, isoString));
export const ceilMinute = (isoString) => floorMinute(addMinutes(1, isoString));
export const ceilHour = (isoString) => floorHour(addHours(1, isoString));

export const ceilDay = (isoString) => floorDay(addDays(1, isoString));
export const ceilWeek = (isoString) => floorDay(addDays(7 - getWeekday(isoString) + 1, isoString));
export const ceilMonth = (isoString) => floorMonth(addMonths(1, isoString));
export const ceilYear = (isoString) => floorYear(addYears(1, isoString));
