import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,

  ceilSecond,
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,

  toFragments,
  isSameOrAfter,
  daysBetween,
  addDays,
} from '../index';

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
