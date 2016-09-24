import {
  toIso,
  toFragments,

  getWeekday,
  subtractDays,
} from '../index';

const convertIsoStringToFragments = (fn, ...rest) => {
  return (isoString) => {
    return fn(toFragments(isoString), ...rest);
  };
};

export const floorSecond = convertIsoStringToFragments((fragments) =>
  toIso({ ...fragments, second: Math.floor(fragments.second) }));

export const floorMinute = convertIsoStringToFragments((fragments) =>
  toIso({ ...fragments, second: 0 }));

export const floorHour = convertIsoStringToFragments((fragments) =>
  toIso({ ...fragments, minute: 0, second: 0 }));

export const floorWeek = (isoString) => {
  const weekDay = getWeekday(isoString);
  return floorDay(subtractDays(isoString, weekDay - 1));
};

export const floorDay = convertIsoStringToFragments((fragments) =>
  toIso({ ...fragments, hour: 0, minute: 0, second: 0 }));

export const floorMonth = convertIsoStringToFragments((fragments) =>
  toIso({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 }));

export const floorYear = convertIsoStringToFragments((fragments) =>
  toIso({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 }));
