import { toFragments, toIso } from '../index'

const floor = (value) => Math.floor(value);
const ceil = (value) => Math.ceil(value);

const fraction = (value) => value % 1;
const sum = (array) => array.reduce((sum, value) => sum + value, 0);

const calculateLeapDayOffset = ({ year }) => 2 - floor(year/100) + floor(year/400);
const calculateDayFraction = ({ hour = 0, minute = 0, second = 0 }) =>
  hour/24 + minute/1440 + second/86400;

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

  return sum([
    floor(AVERAGE_YEAR_DURATION * (fragments.year + 4716)),
    floor(AVERAGE_MONTH_DURATION * (fragments.month + 1)),
    calculateLeapDayOffset(fragments),
    calculateDayFraction(fragments),
    fragments.day,
    -1524.5
  ]);
};

// https://www.wikiwand.com/de/Julianisches_Datum
export const fromJulianDay = (julianDay) => {
  return toIso({
    ...dateComponentFromJulianDay(julianDay),
    ...timeComponentFromJulianDay(julianDay),
  });
};

const dateComponentFromJulianDay = (julianDay) => {
  const fullDays = floor(julianDay + 0.5);

  let g = floor((fullDays - 1867216.25) / 36524.25);
  let A = fullDays + 1 + g - floor(g/4);
  let B = A + 1524;
  let C = floor((B-122.1) / AVERAGE_YEAR_DURATION);
  let D = floor(AVERAGE_YEAR_DURATION * C);
  let E = floor((B-D) / AVERAGE_MONTH_DURATION);

  let day = B - D - floor(AVERAGE_MONTH_DURATION*E);

  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;

  return { year, month, day };
};

const timeComponentFromJulianDay = (julianDay) => {
  const fractionsOfDay = fraction(julianDay + 0.5);
  const hour = floor(fractionsOfDay * 24);
  const minute = floor((fractionsOfDay - hour / 24) * 1440);
  const second = (fractionsOfDay - hour / 24 - minute / 1440) * 86400;

  return { hour, minute, second: (fraction(second * 10000) > 0.9) ? ceil(second) : floor(second) };
};
