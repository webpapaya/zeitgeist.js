import { assertThat, equalTo } from 'hamjest';
import { fromUnixTimestamp, toUnixTimestamp } from '../index';

describe('fromUnixTimestamp', () => {
  it('unix timestamp 0 responds 1970-01-01T00:00:00', () => assertThat(
    fromUnixTimestamp(0), equalTo('1970-01-01T00:00:00')));

  it('unix timestamp 1 responds 1700-01-01T00:00:01', () => assertThat(
    fromUnixTimestamp(1), equalTo('1970-01-01T00:00:01')));
});

describe('toUnixTimestamp', () => {
  it('1970-01-01T00:00:00 responds 0', () => assertThat(
    toUnixTimestamp('1970-01-01T00:00:00'), equalTo(0)));

  it('unix timestamp 1 responds 1970-01-01T00:00:01', () => assertThat(
    toUnixTimestamp('1970-01-01T00:00:01'), equalTo(1)));

  it.skip('unix timestamp 1 responds 2000-01-01T00:00:00', () => assertThat(
    toUnixTimestamp('2000-01-01T00:00:00+00:00'), equalTo(946684800)));

  it('unix timestamp 0 responds 1970-01-01T00:00:00+00:01', () => assertThat(
    toUnixTimestamp('1970-01-01T00:00:00-00:01'), equalTo(60)));
});

const floor = (value) => Math.floor(value)

const daysSinceEpoch = ({ year: _year, month: m, day: d }) => {
  const year = m <= 2
    ? _year - 1
    : _year
  ;

  const era = floor((year >= 0
    ? year
    : year-399
  ) / 400);

  const yearOfEra = year - era * 400;
  const dayOfYear = floor((153*(m + (m > 2 ? -3 : 9)) + 2)/5) + d-1;
  const dayOfEra = yearOfEra * 365 + floor(yearOfEra/4) - floor(yearOfEra/100) + dayOfYear;

  return era * 146097 + dayOfEra - 719468;
};

describe('daysSinceEpoch', () => {
  it('1970-01-01, responds 0', () => assertThat(
    daysSinceEpoch({ year: 1970, month: 1, day: 1}), equalTo(0)));

  it('1970-01-02, responds 1', () => assertThat(
    daysSinceEpoch({ year: 1970, month: 1, day: 2}), equalTo(1)));

  it('1970-01-03, responds 2', () => assertThat(
    daysSinceEpoch({ year: 1970, month: 1, day: 3}), equalTo(2)));
});

