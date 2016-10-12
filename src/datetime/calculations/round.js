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

import {
  fractionOfNumber
} from '../../utils';

const prepareArgs = (fn) => (isoString) => fn(toFragments(isoString), isoString);

export const roundSecond = prepareArgs(({ second }, isoString) => {
  return fractionOfNumber(second) >= 0.5
    ? ceilSecond(isoString)
    : floorSecond(isoString);
});

export const roundMinute = prepareArgs(({ second }, isoString) => {
  return second >= 30
    ? ceilMinute(isoString)
    : floorMinute(isoString);
});

export const roundHour = prepareArgs(({ minute }, isoString) => {
  return minute >= 30
    ? ceilHour(isoString)
    : floorHour(isoString);
});

export const roundDay = prepareArgs(({ hour }, isoString) => {
  return hour >= 12
    ? ceilDay(isoString)
    : floorDay(isoString);
});

export const roundMonth = (isoString) => {
  const startOfThisMonth = floorMonth(isoString);
  const startOfNextMonth = ceilMonth(isoString);
  const daysInThisMonth = daysBetween(startOfThisMonth, startOfNextMonth);
  const middleOfMonth = floorDay(addDays(startOfThisMonth, daysInThisMonth / 2));

  return isSameOrAfter(isoString, middleOfMonth)
    ? ceilMonth(isoString)
    : floorMonth(isoString);
};

export const roundYear = prepareArgs(({ month }, isoString) => {
  return month >= 6
    ? ceilYear(isoString)
    : floorYear(isoString);
});
