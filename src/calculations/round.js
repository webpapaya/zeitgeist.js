import {
  toIso,
  toFragments,
  fromJulianDay,
  toJulianDay,

  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

export const normalize = (isoString) => fromJulianDay(toJulianDay(isoString));

export const floorSecond = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) });
};

export const floorMinute = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: 0 });
};

export const floorHour = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, minute: 0, second: 0 });
};

export const floorDay = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, hour: 0, minute: 0, second: 0 });
};

export const floorMonth = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 });
};

export const floorYear = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 });
};

export const ceilSecond = (isoString) => floorSecond(addSeconds(isoString, 1));
export const ceilMinute = (isoString) => floorMinute(addMinutes(isoString, 1));
export const ceilHour = (isoString) => floorHour(addHours(isoString, 1));

export const ceilDay = (isoString) => floorDay(addDays(isoString, 1));
export const ceilMonth = (isoString) => floorMonth(addMonths(isoString, 1));
export const ceilYear = (isoString) => floorYear(addYears(isoString, 1));

export const roundSecond = (isoString) => {
  const { second } = toFragments(isoString);
  return second % 1 >= 0.5
    ? ceilSecond(isoString)
    : floorSecond(isoString);
};
