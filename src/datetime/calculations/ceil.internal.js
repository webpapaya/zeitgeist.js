import {
  toIso,
  getWeekday,
} from '../index';

import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,
} from './floor';

import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from './add.internal';

// TODO: remove toIso call here
export const ceilSecond = (isoDatetime) =>
  floorSecond(addSeconds(1, toIso(isoDatetime)));

// TODO: remove toIso call here
export const ceilMinute = (isoDatetime) =>
  floorMinute(addMinutes(1, toIso(isoDatetime)));

// TODO: remove toIso call here
export const ceilHour = (isoDatetime) =>
  floorHour(addHours(1, toIso(isoDatetime)));

// TODO: remove toIso call here
export const ceilDay = (isoDatetime) =>
  floorDay(addDays(1, toIso(isoDatetime)));

// TODO: remove toIso call here
export const ceilWeek = (isoDatetime) =>
  floorDay(addDays(7 - getWeekday(isoDatetime) + 1, isoDatetime));

// TODO: remove toIso call here
export const ceilMonth = (isoDatetime) =>
  floorMonth(addMonths(1, toIso(isoDatetime)));

// TODO: remove toIso call here
export const ceilYear = (isoDatetime) =>
  floorYear(addYears(1, toIso(isoDatetime)));
