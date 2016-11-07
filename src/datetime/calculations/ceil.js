import { validateFirstArg as validate } from '../validate';
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

export const ceilSecond = validate((isoDatetime) =>
  floorSecond(addSeconds(1, isoDatetime)));

export const ceilMinute = validate((isoDatetime) =>
  floorMinute(addMinutes(1, isoDatetime)));

export const ceilHour = validate((isoDatetime) =>
  floorHour(addHours(1, isoDatetime)));

export const ceilDay = validate((isoDatetime) =>
  floorDay(addDays(1, isoDatetime)));

export const ceilWeek = validate((isoDatetime) =>
  floorDay(addDays(7 - getWeekday(isoDatetime) + 1, isoDatetime)));

export const ceilMonth = validate((isoDatetime) =>
  floorMonth(addMonths(1, isoDatetime)));

export const ceilYear = validate((isoDatetime) =>
  floorYear(addYears(1, isoDatetime)));
