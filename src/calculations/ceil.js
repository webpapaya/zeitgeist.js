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

export const ceilSecond = (isoString) => floorSecond(addSeconds(isoString, 1));
export const ceilMinute = (isoString) => floorMinute(addMinutes(isoString, 1));
export const ceilHour = (isoString) => floorHour(addHours(isoString, 1));

export const ceilDay = (isoString) => floorDay(addDays(isoString, 1));
export const ceilWeek = (isoString) => floorDay(addDays(isoString, 7 - getWeekday(isoString) + 1));
export const ceilMonth = (isoString) => floorMonth(addMonths(isoString, 1));
export const ceilYear = (isoString) => floorYear(addYears(isoString, 1));

