import {
  SECONDS_IN_REGULAR_DAY,
  MINUTES_IN_REGULAR_DAY,
  HOURS_IN_REGULAR_DAY,
} from '../constants';

import { toFragments, toIso } from '../index';
import { fractionOfNumber } from '../../utils';

const createBig = (input = 0) => {
  const normalize = (value) => value.toValue ? value.toValue() : value;
  const a = normalize(input);

  const add = normalize((b) => createBig(a + b));
  const minus = normalize((b) => createBig(a - b));
  const mod = normalize((b) => createBig(a % b));
  const div = normalize((b) => createBig(a / b));
  const times = normalize((b) => createBig(a * b));

  const floor = () => createBig(Math.floor(a));
  const round = () => createBig(Math.round(a));

  const toValue = () => a;
  const toFractions = () => fractionOfNumber(a);

  return { add, minus, mod, floor, round, div, times, toValue, toFractions };
};

const floor = (value) => Math.floor(value);
const round = (value) => Math.round(value);

const calculateLeapDayOffset = ({ year }) => createBig(2)
  .minus(floor(year/100))
  .add((floor(year/400)))
  .toValue();

const calculateDayFraction = ({ hour = 0, minute = 0, second = 0 }) => createBig()
  .add(hour / HOURS_IN_REGULAR_DAY)
  .add(minute / MINUTES_IN_REGULAR_DAY)
  .add(second / SECONDS_IN_REGULAR_DAY)
  .toValue();

const toCalculationFragments = (isoString) => {
  const fragments = toFragments(isoString);
  const month = fragments.month <= 2 ? fragments.month + 12 : fragments.month;
  const year = fragments.month <= 2 ? fragments.year - 1 : fragments.year;

  return { ...fragments, month, year };
};

const AVERAGE_YEAR_DURATION = 365.25;
const AVERAGE_MONTH_DURATION = 30.6001;

// https://www.wikiwand.com/de/Julianisches_Datum
export const toJulianDay = (isoString) => {
  const fragments = toCalculationFragments(isoString);

  return createBig()
    .add(floor(AVERAGE_YEAR_DURATION * (fragments.year + 4716)))
    .add(floor(AVERAGE_MONTH_DURATION * (fragments.month + 1)))
    .add(calculateLeapDayOffset(fragments))
    .add(calculateDayFraction(fragments))
    .add(fragments.day)
    .add(-1524.5)
    .toValue();
};

// https://www.wikiwand.com/de/Julianisches_Datum
export const fromJulianDay = (julianDay) => {
  return toIso({
    ...dateComponentFromJulianDay(julianDay),
    ...timeComponentFromJulianDay(julianDay),
  });
};

const fromCalculationFragments = (fragments) => {
  const month = fragments.month < 14
    ? fragments.month - 1
    : fragments.month - 13;

  const year = month > 2
    ? fragments.year - 4716
    : fragments.year - 4715;

  return { month, year, day: fragments.day };
};

const dateComponentFromJulianDay = (julianDay) => {
  const _julianDay = createBig(julianDay);

  const fullDays = _julianDay.add(0.5).floor().toValue();
  const normalizedDays = createBig(fullDays)
    .minus(1867216.25)
    .div(36524.25)
    .floor()
    .toValue();

  const daysSinceJulianCalendar = createBig()
    .add(fullDays)
    .add(1)
    .add(normalizedDays)
    .minus(createBig(normalizedDays / 4).floor().toValue())
    .add(1524)
    .toValue();

  const year = createBig(daysSinceJulianCalendar - 122.1)
    .div(AVERAGE_YEAR_DURATION)
    .floor()
    .toValue();

  const daysWithoutYear = createBig(AVERAGE_YEAR_DURATION)
    .times(year)
    .floor()
    .toValue();

  const month = createBig()
    .add(daysSinceJulianCalendar)
    .minus(daysWithoutYear)
    .div(AVERAGE_MONTH_DURATION)
    .floor()
    .toValue();

  const monthsInDays = createBig()
    .add(AVERAGE_MONTH_DURATION)
    .times(month)
    .floor()
    .toValue();

  const day = createBig()
    .add(daysSinceJulianCalendar)
    .minus(daysWithoutYear)
    .minus(monthsInDays)
    .toValue();

  return fromCalculationFragments({ year, month, day });
};

const timeComponentFromJulianDay = (julianDay) => {
  const fractionOfDayInSeconds = createBig(fractionOfNumber(julianDay + 0.5))
    .times(SECONDS_IN_REGULAR_DAY)
    .round();

  const secondsWithoutHours = createBig(fractionOfDayInSeconds).mod(3600);
  const hour = createBig(fractionOfDayInSeconds).div(3600).floor();
  const minute = createBig(secondsWithoutHours).div(60).floor();
  const second = createBig(secondsWithoutHours).mod(60);

  return {
    hour: hour.toValue(),
    minute: minute.toValue(),
    second: second.toValue()
  };
};
