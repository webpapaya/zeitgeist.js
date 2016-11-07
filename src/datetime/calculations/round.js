import { validateFirstArg as validate } from '../validate';
import { fractionOfNumber } from '../../utils';
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
  normalize,
} from '../index';

const normalizeArg = (fn) => validate((isoDateTime) => fn(normalize(isoDateTime)));
const prepareArgs = (fn) => normalizeArg((isoDateTime) =>
  fn(toFragments(isoDateTime), isoDateTime));

export const roundSecond = validate((isoDatetime) => {
  const { second } = toFragments(isoDatetime);
  return fractionOfNumber(second) >= 0.5
    ? ceilSecond(isoDatetime)
    : floorSecond(isoDatetime);
});

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

export const roundMonth = validate((isoDateTime) => {
  const startOfThisMonth = floorMonth(isoDateTime);
  const startOfNextMonth = ceilMonth(isoDateTime);
  const daysInThisMonth = daysBetween(startOfThisMonth, startOfNextMonth);
  const middleOfMonth = floorDay(addDays(daysInThisMonth / 2, startOfThisMonth));

  return isSameOrAfter(isoDateTime, middleOfMonth)
    ? ceilMonth(isoDateTime)
    : floorMonth(isoDateTime);
});

export const roundYear = prepareArgs(({ month }, isoDateTime) => {
  return month >= 6
    ? ceilYear(isoDateTime)
    : floorYear(isoDateTime);
});
