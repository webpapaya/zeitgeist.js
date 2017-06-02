import { fractionOfNumber } from '../../utils';
import {
  daysBetween,
  toIso as toIsoTODORemoved,
} from '../index';

import {
  isSameOrAfter,
} from '../compare.internal';

import floorSecond from '../floor-seconds';
import floorMinute from '../floor-minutes';
import floorHour from '../floor-hours';
import floorDay from '../floor-days';
import floorMonth from '../floor-months';
import floorYear from '../floor-years';

import ceilSecond from '../ceil-seconds';
import ceilMinute from '../ceil-minutes';
import ceilHour from '../ceil-hours';
import ceilDay from '../ceil-days';
import ceilMonth from '../ceil-months';
import ceilYear from '../ceil-years';

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
