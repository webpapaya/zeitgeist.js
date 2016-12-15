import {
  getWeekday,

} from '../index';

import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,
} from './floor.internal';

import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from './add.internal';

export const ceilSecond = (isoDatetime) =>
  floorSecond(addSeconds(1, isoDatetime));

export const ceilMinute = (isoDatetime) =>
  floorMinute(addMinutes(1, isoDatetime));

export const ceilHour = (isoDatetime) =>
  floorHour(addHours(1, isoDatetime));

export const ceilDay = (isoDatetime) =>
  floorDay(addDays(1, isoDatetime));

export const ceilWeek = (isoDatetime) =>
  floorDay(addDays(7 - getWeekday(isoDatetime) + 1, isoDatetime));

export const ceilMonth = (isoDatetime) =>
  floorMonth(addMonths(1, isoDatetime));

export const ceilYear = (isoDatetime) =>
  floorYear(addYears(1, isoDatetime));
