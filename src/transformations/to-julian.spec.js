import { toFragments, toIso } from '../index'

const floor = (value) => Math.floor(value);
const fraction = (value) => value % 1;

// https://www.wikiwand.com/de/Julianisches_Datum
export const toJulian = (isoString) => {
  const fragments = toFragments(isoString);
  const month = fragments.month <= 2 ? fragments.month + 12 : fragments.month;
  const year = fragments.month <= 2 ? fragments.year - 1 : fragments.year;
  const day = fragments.day;

  const timeComponent = (fragments.hour || 0)/24 + (fragments.minute || 0)/1440 + (fragments.second || 0)/86400;

  const a = floor(year/100);
  const b = 2 - a + floor(a/4);

  return floor(365.25 * (year+4716)) + floor( 30.6001 * (month+1)) + day + b + timeComponent - 1524.5;
};

// https://www.wikiwand.com/de/Julianisches_Datum
export const fromJulian = (julianDate) => {
  const fullDays = floor(julianDate + 0.5);
  const fractionsOfDay = fraction(julianDate + 0.5);

  let g = floor((fullDays - 1867216.25) / 36524.25);
  let A = fullDays + 1 + g - floor(g/4);
  let B = A + 1524;
  let C = floor((B-122.1) / 365.25);
  let D = floor(365.25 * C);
  let E = floor((B-D) / 30.6001);

  let day = B - D - floor(30.6001*E) + fractionsOfDay;

  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;

  return toIso({ year: year, month: month, day: day });
};

import { assertThat, equalTo } from 'hamjest';
describe('toJulian', () => {
  it('ISO 2000-01-01 is 2451544.5 in Julian date', () => assertThat(
    toJulian('2000-01-01'), equalTo(2451544.5)));

  it('ISO 2000-01-01T10:20:30 is 2451544.9309027777 in Julian date', () => assertThat(
    toJulian('2000-01-01T10:20:30'), equalTo(2451544.9309027777)));
});

describe.only('fromJulian', () => {
  it('julian date 2451544.5 is ISO 2000-01-01', () => assertThat(
    fromJulian(2451544.5), equalTo('2000-01-01')));
});


