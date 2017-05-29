import ci from 'ci-info';
import { assertThat, equalTo } from 'hamjest';
import { fromUnixTimestamp } from '../index';

describe('fromUnixTimestamp', () => {
  it('unix timestamp 0 responds 1970-01-01T00:00:00', () => assertThat(
    fromUnixTimestamp(0), equalTo('1970-01-01T00:00:00')));

  it('unix timestamp 1 responds 1700-01-01T00:00:01', () => assertThat(
    fromUnixTimestamp(1), equalTo('1970-01-01T00:00:01')));
});

const floor = (value) => Math.floor(value);
const daysSinceEpoch = ({ year: _year, month: m, day: d }) => {
  const year = m <= 2
    ? _year - 1
    : _year
  ;

  const era = floor((year >= 0
    ? year
    : year - 399
  ) / 400);

  const yearOfEra = year - era * 400;
  const dayOfYear = floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const dayOfEra = yearOfEra * 365 + floor(yearOfEra / 4) - floor(yearOfEra / 100) + dayOfYear;

  return era * 146097 + dayOfEra - 719468;
};

describe('daysSinceEpoch', () => {
  it('1969-12-30, responds -2', () => assertThat(
    daysSinceEpoch({ year: 1969, month: 12, day: 30 }), equalTo(-2)));

  it('1969-12-31, responds -1', () => assertThat(
    daysSinceEpoch({ year: 1969, month: 12, day: 31 }), equalTo(-1)));

  it('1970-01-01, responds 0', () => assertThat(
    daysSinceEpoch({ year: 1970, month: 1, day: 1 }), equalTo(0)));

  it('1970-01-02, responds 1', () => assertThat(
    daysSinceEpoch({ year: 1970, month: 1, day: 2 }), equalTo(1)));

  it('1970-01-03, responds 2', () => assertThat(
    daysSinceEpoch({ year: 1970, month: 1, day: 3 }), equalTo(2)));
});


import { toFragments } from '../index';
import { compose } from '../../utils';

const isFloat = (value) => !isNaN(value) && value.toString().indexOf('.') != -1;

const getMillisecondsFromSeconds = (seconds) => isFloat(seconds)
  ? parseInt(`${(seconds)}0000`.replace(/\d*\./, '0').slice(0, 4))
  : 0;

const toUnixTimestamp = (isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  const days = daysSinceEpoch(fragments);
  const milliseconds = getMillisecondsFromSeconds(fragments.second);

  return compose(
    (sum) => sum + days * 24 * 60 * 60 * 1000,
    (sum) => sum + (fragments.hour || 0) * 60 * 60 * 1000,
    (sum) => sum + (fragments.minute || 0) * 60 * 1000,
    (sum) => sum + floor((fragments.second || 0)) * 1000,
    (sum) => sum + milliseconds,
  )(0);
};

describe('toUnixTimestamp', () => {
  if (ci.isCI) { // only run those tests on CI
    Array.from({ length: 100000 })
      .map(() => Math.floor(Math.random() * new Date() - new Date() / 2))
      .sort((a, b) => a - b)
      .forEach((unixTimestamp) => {
        it(`${new Date(unixTimestamp).toISOString()} is converted to ${unixTimestamp}`, () => {
          assertThat(toUnixTimestamp(new Date(unixTimestamp).toISOString()), equalTo(unixTimestamp));
        });
      });
  }

  [
    { isoDatetime: '1970-01-01T00:00:00', unixTimestamp: 0 },
    { isoDatetime: '1970-01-01T00:00:00.01', unixTimestamp: 10 },
    { isoDatetime: '1970-01-01T00:00:01', unixTimestamp: 1000 },
    { isoDatetime: '1970-01-01T00:01:00', unixTimestamp: 60000 },
    { isoDatetime: '1970-01-01T01:00:00', unixTimestamp: 3600000 },
    { isoDatetime: '1970-01-02T00:00:00', unixTimestamp: 86400000 },
    { isoDatetime: '1970-01-01T00:00:01.001', unixTimestamp: 1001 },
  ].forEach(({ isoDatetime, unixTimestamp }) => {
    it(`${isoDatetime} is unix timestamp ${unixTimestamp} `, () => assertThat(
      toUnixTimestamp(isoDatetime), equalTo(unixTimestamp)));
  });
});

