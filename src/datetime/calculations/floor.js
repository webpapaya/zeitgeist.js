import {
  toIso,
  toFragments,

  getWeekday,
  subtractDays,
} from '../index';

const parseArgAsFragments = (fn) => (isoString) => fn(toFragments(isoString));

export const floorSecond = parseArgAsFragments((fragments) =>
  toIso({ ...fragments, second: Math.floor(fragments.second) }));

export const floorMinute = parseArgAsFragments((fragments) =>
  toIso({ ...fragments, second: 0 }));

export const floorHour = parseArgAsFragments((fragments) =>
  toIso({ ...fragments, minute: 0, second: 0 }));

export const floorWeek = (isoString) => {
  const weekDay = getWeekday(isoString);
  return floorDay(subtractDays(isoString, weekDay - 1));
};

export const floorDay = parseArgAsFragments((fragments) =>
  toIso({ ...fragments, hour: 0, minute: 0, second: 0 }));

export const floorMonth = parseArgAsFragments((fragments) =>
  toIso({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 }));

export const floorYear = parseArgAsFragments((fragments) =>
  toIso({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 }));
