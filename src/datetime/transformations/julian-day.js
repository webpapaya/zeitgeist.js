import Big from 'big.js';

import {
  SECONDS_IN_REGULAR_DAY,
  MINUTES_IN_REGULAR_DAY,
  HOURS_IN_REGULAR_DAY,
} from '../constants';

import { toFragments, toIso } from '../index';
import { fractionOfNumber } from '../../utils';

const createBig = (input = 0) => {
  const normalize = (value) => value && value.isBig ? parseFloat(value.toString()) : parseFloat(value);
  const normalizeInput = (fn) => (value) => fn(normalize(input), normalize(value));
  const normalizeAndBuild = (fn) => (value) => createBig(fn(normalize(input), normalize(value)));

  const normalizeBig = (fn) => (value) => createBig(new Big(fn(
    new Big(normalize(input)),
    value ? new Big(normalize(value)) : void 0
  )));

  const add = normalizeBig((a, b) => a.add(b));
  const minus = normalizeBig((a, b) => a.minus(b));
  const mod = normalizeBig((a, b) => a.mod(b));
  const div = normalizeBig((a, b) => a.div(b));
  const times = normalizeBig((a, b) => a.times(b));

  const floor = normalizeBig((a) => Math.floor(a));
  const round = normalizeBig((a) => a.round());

  const lt = normalizeInput((a, b) => a < b);
  const lte = normalizeInput((a, b) => a <= b);
  const gt = normalizeInput((a, b) => a > b);
  const gte = normalizeInput((a, b) => a >= b);


  const toString = () => normalize(input);
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
    toString,
    toFractions,
    isBig: true,
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
  toJulianDayPrecise(isoString).toString();

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
    ? createBig(fragments.month).minus(1).toString()
    : createBig(fragments.month).minus(13).toString();

  const year = createBig(month).gt(2)
    ? createBig(fragments.year).minus(4716).toString()
    : createBig(fragments.year).minus(4715).toString();

  return { month, year, day: fragments.day.toString() };
};

const dateComponentFromJulianDay = (julianDay) => {
  const fullDays = julianDay.add(0.5).floor().toString();
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
    day,
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
    hour: hour.toString(),
    minute: minute.toString(),
    second: second.toString(),
  };
};
