import ci from 'ci-info';
import { assertThat, equalTo } from 'hamjest';
import { fromUnixTimestamp, toUnixTimestamp, daysSinceEpoch } from './unix-timestamp';

describe('fromUnixTimestamp', () => {
  it('unix timestamp 0 responds 1970-01-01T00:00:00', () => assertThat(
    fromUnixTimestamp(0), equalTo('1970-01-01T00:00:00')));

  it('unix timestamp 1 responds 1700-01-01T00:00:01', () => assertThat(
    fromUnixTimestamp(1), equalTo('1970-01-01T00:00:01')));
});

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
    { isoDatetime: '285428751-11-12T07:36:31', unixTimestamp: 9007199254740990000 },
  ].forEach(({ isoDatetime, unixTimestamp }) => {
    it(`${isoDatetime} is unix timestamp ${unixTimestamp} `, () => assertThat(
      toUnixTimestamp(isoDatetime), equalTo(unixTimestamp)));
  });
});

const epochToDate = (unixTimestamp) => {
  const z = Math.floor(unixTimestamp + 719468);
  const era = Math.floor((z >= 0 ? z : z - 146096) / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe/1460) + Math.floor(doe/36524) - Math.floor(doe/146096)) / 365);
  const y = yoe + era * 400;
  const doy = doe - (365*yoe + Math.floor(yoe/4) - Math.floor(yoe/100));
  const mp = Math.floor((5*doy + 2)/153);
  const d = doy - Math.floor((153*mp+2)/5) + 1;
  const m = mp + (mp < 10 ? 3 : -9);

  return {
    year: m <= 2 ? y + 1 : y,
    month: m,
    day: d,
  };
};

describe('epochToDays', () => {
  [
    { year: 1969, month: 12, day: 31, daysSinceEpoch: -1 },
    { year: 1970, month: 1, day: 1, daysSinceEpoch: 0 },
    { year: 1970, month: 1, day: 2, daysSinceEpoch: 1 },
    { year: 1970, month: 1, day: 3, daysSinceEpoch: 2 },
  ].forEach(({ year, month, day, daysSinceEpoch }) => {
    it(`${daysSinceEpoch} is ${year} ${month} ${day} `, () => assertThat(
      epochToDate(daysSinceEpoch), equalTo({ year, month, day })));
  });
});

