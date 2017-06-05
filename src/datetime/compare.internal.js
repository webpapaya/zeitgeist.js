import { curry } from '../utils';

import floorSecond from './floor-second';
import floorMinute from './floor-minute';
import floorHour from './floor-hour';
import floorDay from './floor-day';
import floorMonth from './floor-month';
import floorYear from './floor-year';

import { toFloat } from './index';

export const isBefore = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) < toFloat(maybeAfter);

export const isSameOrBefore = (maybeBefore, maybeAfter) =>
  isSame(maybeBefore, maybeAfter) || isBefore(maybeBefore, maybeAfter);

export const isAfter = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) > toFloat(maybeAfter);

export const isSameOrAfter = (maybeBefore, maybeAfter) =>
  isSame(maybeBefore, maybeAfter) || isAfter(maybeBefore, maybeAfter);

export const isBetween = curry(({ from, to }, dateToCheck) => {
  return isSameOrAfter(from, to)
    ? isSameOrAfter(from, dateToCheck) && isSameOrBefore(to, dateToCheck)
    : isSameOrAfter(to, dateToCheck) && isSameOrBefore(from, dateToCheck);
});

export const isSame = (firstDate, secondDate) =>
  toFloat(firstDate) === toFloat(secondDate);

export const isSameYear = curry((firstDate, secondDate) =>
  isSame(floorYear(firstDate), floorYear(secondDate)));

export const isSameMonth = curry((firstDate, secondDate) =>
  isSame(floorMonth(firstDate), floorMonth(secondDate)));

export const isSameDay = curry((firstDate, secondDate) =>
  isSame(floorDay(firstDate), floorDay(secondDate)));

export const isSameHour = curry((firstDate, secondDate) =>
  isSame(floorHour(firstDate), floorHour(secondDate)));

export const isSameMinute = curry((firstDate, secondDate) =>
  isSame(floorMinute(firstDate), floorMinute(secondDate)));


export const isSameSecond = curry((firstDate, secondDate) =>
  isSame(floorSecond(firstDate), floorSecond(secondDate)));
