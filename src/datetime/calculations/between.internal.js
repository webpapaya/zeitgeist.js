
import {
  toJulianDay,
  removeTimeComponent,
  containsDateComponent,
  isBefore,
  isSame,
} from '../index';

import {
  curry,
  isEmpty,
  tco,
} from '../../utils';

import addDays from '../add-days';

const floor = (value) => Math.floor(value);

export const daysBetween = (from, to) => {
  const daysFrom = containsDateComponent(from) ? toJulianDay(from) : 0;
  const daysTo = containsDateComponent(to) ? toJulianDay(to) : 0;

  return floor(daysTo + 0.5) - floor(daysFrom + 0.5);
};


const calculateDatesBetween = tco((from, to, dates = []) => {
  const nextDates = !isEmpty(from) ? [...dates, from] : [...dates];
  if (isSame(from, to)) { return nextDates; }

  const direction = isBefore(from, to) ? 1 : -1;
  const nextFrom = addDays(direction, from);
  return calculateDatesBetween(nextFrom, to, nextDates);
});

export const datesBetween = curry((from, to) => {
  const fromWithoutTimeComponent = removeTimeComponent(from);
  const toWithoutTimeComponent = removeTimeComponent(to);
  return calculateDatesBetween(fromWithoutTimeComponent, toWithoutTimeComponent);
});
