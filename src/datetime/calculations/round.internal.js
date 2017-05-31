import { fractionOfNumber } from '../../utils';
import {
  daysBetween,
  toIso as toIsoTODORemoved,
} from '../index';

import {
  isSameOrAfter,
} from '../compare.internal';

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

import addDays from '../add-days';

export const roundSecond = (fragments) => {
  return fractionOfNumber(fragments.second) >= 0.5
    ? ceilSecond(fragments)
    : floorSecond(fragments);
};

export const roundMinute = (fragments) => {
  return fragments.second >= 30
    ? ceilMinute(fragments)
    : floorMinute(fragments);
};

export const roundHour = (fragments) => {
  return fragments.minute >= 30
    ? ceilHour(fragments)
    : floorHour(fragments);
};

export const roundDay = (fragments) => {
  return fragments.hour >= 12
    ? ceilDay(fragments)
    : floorDay(fragments);
};

export const roundMonth = (fragments) => {
  const startOfThisMonth = floorMonth(fragments);
  const startOfNextMonth = ceilMonth(fragments);

  const daysInThisMonth = daysBetween(startOfThisMonth, startOfNextMonth);
  const middleOfMonth = floorDay(addDays(daysInThisMonth / 2, startOfThisMonth));

  return isSameOrAfter(toIsoTODORemoved(fragments), middleOfMonth)
    ? ceilMonth(fragments)
    : floorMonth(fragments);
};

export const roundYear = (fragments) => {
  return fragments.month >= 6
    ? ceilYear(fragments)
    : floorYear(fragments);
};
