import {
  toIso,
  toFragments,
  getWeekday,
} from '../index';

import subtractDays from '../subtract-days';

import { compose } from '../../utils';

const parseArgAsFragments = (fn) => (isoDatetime) =>
  compose(toFragments, fn, toIso)(isoDatetime);

export const floorSecond = (fragments) =>
  ({ ...fragments, second: Math.floor(fragments.second) });

export const floorMinute = parseArgAsFragments((fragments) =>
  ({ ...fragments, second: 0 }));

export const floorHour = parseArgAsFragments((fragments) =>
  ({ ...fragments, minute: 0, second: 0 }));

export const floorWeek = (isoDatetime) => {
  const weekDay = getWeekday(isoDatetime);
  return floorDay(subtractDays(weekDay - 1, isoDatetime));
};

export const floorDay = parseArgAsFragments((fragments) =>
  ({ ...fragments, hour: 0, minute: 0, second: 0 }));

export const floorMonth = parseArgAsFragments((fragments) =>
  ({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 }));

export const floorYear = parseArgAsFragments((fragments) =>
  ({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 }));

