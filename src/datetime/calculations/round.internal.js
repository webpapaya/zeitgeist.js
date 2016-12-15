import { fractionOfNumber } from '../../utils';
import {
  toFragments,
  isSameOrAfter,
  daysBetween,
  addDays,
  normalize,
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
  ceilSecond,
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,
} from './ceil.internal';

const normalizeArg = (fn) => (isoDateTime) => fn(normalize(isoDateTime));
const prepareArgs = (fn) => normalizeArg((isoDateTime) =>
  fn(toFragments(isoDateTime), isoDateTime));

export const roundSecond = (isoDatetime) => {
  const { second } = toFragments(isoDatetime);
  return fractionOfNumber(second) >= 0.5
    ? ceilSecond(isoDatetime)
    : floorSecond(isoDatetime);
};

export const roundMinute = prepareArgs(({ second }, isoDateTime) => {
  return second >= 30
    ? ceilMinute(isoDateTime)
    : floorMinute(isoDateTime);
});

export const roundHour = prepareArgs(({ minute }, isoDateTime) => {
  return minute >= 30
    ? ceilHour(isoDateTime)
    : floorHour(isoDateTime);
});

export const roundDay = prepareArgs(({ hour }, isoDateTime) => {
  return hour >= 12
    ? ceilDay(isoDateTime)
    : floorDay(isoDateTime);
});

export const roundMonth = (isoDateTime) => {
  const startOfThisMonth = floorMonth(isoDateTime);
  const startOfNextMonth = ceilMonth(isoDateTime);
  const daysInThisMonth = daysBetween(startOfThisMonth, startOfNextMonth);
  const middleOfMonth = floorDay(addDays(daysInThisMonth / 2, startOfThisMonth));

  return isSameOrAfter(isoDateTime, middleOfMonth)
    ? ceilMonth(isoDateTime)
    : floorMonth(isoDateTime);
};

export const roundYear = prepareArgs(({ month }, isoDateTime) => {
  return month >= 6
    ? ceilYear(isoDateTime)
    : floorYear(isoDateTime);
});
