import { assertThat, equalTo } from 'hamjest';
import { fromJulianDate, toJulianDate } from '../index';
describe('toJulianDate', () => {
  it('ISO 2000-01-01 is 2451544.5 in Julian date', () => assertThat(
    toJulianDate('2000-01-01'), equalTo(2451544.5)));

  it('ISO 2000-01-01T10:20:30 is 2451544.9309027777 in Julian date', () => assertThat(
    toJulianDate('2000-01-01T10:20:30'), equalTo(2451544.9309027777)));
});

describe('fromJulianDate', () => {
  it('julian date 2451544.5 is ISO 2000-01-01', () => assertThat(
    fromJulianDate(2451544.5), equalTo('2000-01-01')));
});


