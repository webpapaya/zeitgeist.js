import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,

  toFragments,
  fromJulianDay,
  toJulianDay,

  isSameOrAfter,
  daysBetween,

  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

export const normalize = (isoString) => fromJulianDay(toJulianDay(isoString));


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

export const roundMinute = (isoString) => {
  const { second } = toFragments(isoString);
  return second >= 30
    ? ceilMinute(isoString)
    : floorMinute(isoString);
};

export const roundHour = (isoString) => {
  const { minute } = toFragments(isoString);
  return minute >= 30
    ? ceilHour(isoString)
    : floorHour(isoString);
};

export const roundDay = (isoString) => {
  const { hour } = toFragments(isoString);
  return hour >= 12
    ? ceilDay(isoString)
    : floorDay(isoString);
};

export const roundMonth = (isoString) => {
  const startOfThisMonth = floorMonth(isoString);
  const startOfNextMonth = ceilMonth(isoString);
  const daysInThisMonth = daysBetween(startOfThisMonth, startOfNextMonth);
  const middleOfMonth = floorDay(addDays(startOfThisMonth, daysInThisMonth / 2));

  return isSameOrAfter(isoString, middleOfMonth)
    ? ceilMonth(isoString)
    : floorMonth(isoString);
};

export const roundYear = (isoString) => {
  const { month } = toFragments(isoString);
  return month >= 6
    ? ceilYear(isoString)
    : floorYear(isoString);
};
