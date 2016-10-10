import Big from 'big.js';

import {
  SECONDS_IN_REGULAR_DAY,
  MINUTES_IN_REGULAR_DAY,
  HOURS_IN_REGULAR_DAY,
} from '../constants';

import { toFragments, toIso } from '../index';
import { fractionOfNumber } from '../../utils';

const createBig = (input = 0) => {
  const normalize = (value) => value && value.toValue ? value.toValue() : value;


  const normalizeInput = (fn) => (value) => fn(normalize(input), normalize(value));
  const normalizeAndBuild = (fn) => (value) => createBig(fn(normalize(input), normalize(value)));

  const add = normalizeAndBuild((a, b) => a + b);
  const minus = normalizeAndBuild((a, b) => a - b);
  const mod = normalizeAndBuild((a, b) => a % b);
  const div = normalizeAndBuild((a, b) => a / b);
  const times = normalizeAndBuild((a, b) => a * b);

  const floor = normalizeAndBuild((a) => Math.floor(a));
  const round = normalizeAndBuild((a) => Math.round(a));

  const lt = normalizeInput((a, b) => a < b);
  const lte = normalizeInput((a, b) => a <= b);
  const gt = normalizeInput((a, b) => a > b);
  const gte = normalizeInput((a, b) => a >= b);


  const toValue = () => normalize(input);
  const toFractions = normalizeAndBuild((a) => fractionOfNumber(a));

  return {
    lt,
    lte,
    gt,
    gte,

    add,
    minus,
    mod,
    floor,
    round,
    div,
    times,
    toValue,
    toFractions
  };
};

const calculateLeapDayOffset = ({ year }) => createBig(2)
  .minus(createBig(year).div(100).floor())
  .add(createBig(year).div(400).floor());

const calculateDayFraction = ({ hour = 0, minute = 0, second = 0 }) => createBig()
  .add(createBig(hour).div(HOURS_IN_REGULAR_DAY))
  .add(createBig(minute).div(MINUTES_IN_REGULAR_DAY))
  .add(createBig(second).div(SECONDS_IN_REGULAR_DAY));

const toCalculationFragments = (isoString) => {
  const fragments = toFragments(isoString);

  const month = createBig(fragments.month).lte(2)
    ? createBig(fragments.month).add(12)
    : createBig(fragments.month);

  const year = createBig(fragments.month).lte(2)
    ? createBig(fragments.year).minus(1)
    : createBig(fragments.year);

  return { ...fragments, month, year };
};

const AVERAGE_YEAR_DURATION = 365.25;
const AVERAGE_MONTH_DURATION = 30.6001;


export const toJulianDay = (isoString) =>
  toJulianDayPrecise(isoString).toValue();

// https://www.wikiwand.com/de/Julianisches_Datum
export const toJulianDayPrecise = (isoString) => {
  const fragments = toCalculationFragments(isoString);

  return createBig()
    .add(createBig(fragments.year)
      .add(4716)
      .times(AVERAGE_YEAR_DURATION)
      .floor())

    .add(createBig(fragments.month)
      .add(1)
      .times(AVERAGE_MONTH_DURATION)
      .floor())

    .add(calculateLeapDayOffset(fragments))
    .add(calculateDayFraction(fragments))
    .add(fragments.day)
    .add(-1524.5);
};


// https://www.wikiwand.com/de/Julianisches_Datum
export const fromJulianDay = (julianDay) => {
  return toIso({
    ...dateComponentFromJulianDay(createBig(julianDay)),
    ...timeComponentFromJulianDay(createBig(julianDay)),
  });
};

const fromCalculationFragments = (fragments) => {
  const month = createBig(fragments.month).lt(14)
    ? createBig(fragments.month).minus(1).toValue()
    : createBig(fragments.month).minus(13).toValue();

  const year = createBig(month).gt(2)
    ? createBig(fragments.year).minus(4716).toValue()
    : createBig(fragments.year).minus(4715).toValue();

  return { month, year, day: fragments.day.toValue() };
};

const dateComponentFromJulianDay = (julianDay) => {
  const fullDays = julianDay.add(0.5).floor().toValue();
  const normalizedDays = createBig(fullDays)
    .minus(1867216.25)
    .div(36524.25)
    .floor();

  const daysSinceJulianCalendar = createBig()
    .add(fullDays)
    .add(1)
    .add(normalizedDays)
    .minus(createBig(normalizedDays).div(4).floor())
    .add(1524);

  const year = createBig(daysSinceJulianCalendar)
    .minus(122.1)
    .div(AVERAGE_YEAR_DURATION)
    .floor();

  const daysWithoutYear = createBig(AVERAGE_YEAR_DURATION)
    .times(year)
    .floor();

  const month = createBig()
    .add(daysSinceJulianCalendar)
    .minus(daysWithoutYear)
    .div(AVERAGE_MONTH_DURATION)
    .floor();

  const monthsInDays = createBig()
    .add(AVERAGE_MONTH_DURATION)
    .times(month)
    .floor();

  const day = createBig()
    .add(daysSinceJulianCalendar)
    .minus(daysWithoutYear)
    .minus(monthsInDays);

  return fromCalculationFragments({
    year,
    month,
    day
  });
};

const timeComponentFromJulianDay = (julianDay) => {
  const fractionOfDayInSeconds = createBig(julianDay)
    .add(0.5)
    .toFractions()
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
