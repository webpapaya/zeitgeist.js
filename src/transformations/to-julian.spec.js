import { toFragments } from '../index'

const floor = (value) => Math.floor(value);

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

import { assertThat, equalTo } from 'hamjest';
describe.only('toJulian', () => {
  it('ISO 2000-01-01 is 2451544.5 in Julian date', () => assertThat(
    toJulian('2000-01-01'), equalTo(2451544.5)));

  it('ISO 2000-01-01T10:20:30 is 2451544.9309027777 in Julian date', () => assertThat(
    toJulian('2000-01-01T10:20:30'), equalTo(2451544.9309027777)));
});

