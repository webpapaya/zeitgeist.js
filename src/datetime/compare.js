import {
  toFloat,
  floorYear,
  floorMonth,
  floorDay,
  floorHour,
  floorMinute,
  floorSecond,
} from './index';

export const isBefore = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) < toFloat(maybeAfter);

export const isSameOrBefore = (maybeBefore, maybeAfter) =>
  isSame(maybeBefore, maybeAfter) || isBefore(maybeBefore, maybeAfter);

export const isAfter = (maybeBefore, maybeAfter) =>
  toFloat(maybeBefore) > toFloat(maybeAfter);

export const isSameOrAfter = (maybeBefore, maybeAfter) =>
  isSame(maybeBefore, maybeAfter) || isAfter(maybeBefore, maybeAfter);

export const isBetween = (dateToCheck, { from, to }) => {
  return isSameOrAfter(from, to)
    ? isSameOrAfter(from, dateToCheck) && isSameOrBefore(to, dateToCheck)
    : isSameOrAfter(to, dateToCheck) && isSameOrBefore(from, dateToCheck);
};

export const isSame = (firstDate, secondDate) =>
  toFloat(firstDate) === toFloat(secondDate);

export const isSameYear = (firstDate, secondDate) =>
  isSame(floorYear(firstDate), floorYear(secondDate));

export const isSameMonth = (firstDate, secondDate) =>
  isSame(floorMonth(firstDate), floorMonth(secondDate));

export const isSameDay = (firstDate, secondDate) =>
  isSame(floorDay(firstDate), floorDay(secondDate));

export const isSameHour = (firstDate, secondDate) =>
  isSame(floorHour(firstDate), floorHour(secondDate));

export const isSameMinute = (firstDate, secondDate) =>
  isSame(floorMinute(firstDate), floorMinute(secondDate));

export const isSameSecond = (firstDate, secondDate) =>
  isSame(floorSecond(firstDate), floorSecond(secondDate));
