import { assertThat, equalTo } from 'hamjest';
import { fromJulian, toJulian } from '../index';
describe('toJulian', () => {
  it('ISO 2000-01-01 is 2451544.5 in Julian date', () => assertThat(
    toJulian('2000-01-01'), equalTo(2451544.5)));

  it('ISO 2000-01-01T10:20:30 is 2451544.9309027777 in Julian date', () => assertThat(
    toJulian('2000-01-01T10:20:30'), equalTo(2451544.9309027777)));
});

describe('fromJulian', () => {
  it('julian date 2451544.5 is ISO 2000-01-01', () => assertThat(
    fromJulian(2451544.5), equalTo('2000-01-01')));
});


