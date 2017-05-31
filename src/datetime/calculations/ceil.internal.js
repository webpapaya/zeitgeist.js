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

import addSeconds from '../add-seconds';
import addMinutes from '../add-minutes';
import addHours from '../add-hours';
import addDays from '../add-days';
import addMonths from '../add-months';
import addYears from '../add-years';

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
