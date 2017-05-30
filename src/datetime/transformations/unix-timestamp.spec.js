import { assertThat, equalTo } from 'hamjest';
import { fromUnixTimestamp, toUnixTimestamp, daysSinceEpoch, dayOfEpochToDate } from './unix-timestamp';

describe('fromUnixTimestamp', () => {
  it('unix timestamp 0 responds 1970-01-01T00:00:00', () => assertThat(
    fromUnixTimestamp(0), equalTo('1970-01-01T00:00:00')));

  it('unix timestamp 1 responds 1700-01-01T00:00:00.001', () => assertThat(
    fromUnixTimestamp(1), equalTo('1970-01-01T00:00:00.001')));

  it('unix timestamp 1000 responds 1970-01-01T00:00:01', () => assertThat(
    fromUnixTimestamp(1000), equalTo('1970-01-01T00:00:01')));

  it('unix timestamp 60000 responds 1970-01-01T00:00:01', () => assertThat(
    fromUnixTimestamp(60000), equalTo('1970-01-01T00:01:00')));

  it('unix timestamp 1496168307917 responds 2017-05-30T18:18:27.917', () => assertThat(
    fromUnixTimestamp(1496168307917), equalTo('2017-05-30T18:18:27.917')));

  describe('toUnixTimestamp is the reverse of fromUnixTimestamp', () => {
    Array.from({ length: 1000 })
      .map(() => Math.floor(Math.random() * new Date() - new Date() / 2))
      .sort((a, b) => a - b)
      .forEach((unixTimestamp) => {
        it(`unix timestamp ${unixTimestamp} can be reversed`, () => assertThat(
          toUnixTimestamp(fromUnixTimestamp(unixTimestamp)), equalTo(unixTimestamp)));
      });
  });
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
  describe('randomized verification tests', () => {
    Array.from({ length: 1000 })
      .map(() => Math.floor(Math.random() * new Date() - new Date() / 2))
      .sort((a, b) => a - b)
      .forEach((unixTimestamp) => {
        it(`${new Date(unixTimestamp).toISOString()} is converted to ${unixTimestamp}`, () => {
          assertThat(toUnixTimestamp(new Date(unixTimestamp).toISOString()), equalTo(unixTimestamp));
        });
      });
  });

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

describe('dayOfEpochToDate', () => {
  [
    { year: 1969, month: 12, day: 31, daysSinceEpoch: -1 },
    { year: 1970, month: 1, day: 1, daysSinceEpoch: 0 },
    { year: 1970, month: 1, day: 2, daysSinceEpoch: 1 },
    { year: 1970, month: 1, day: 3, daysSinceEpoch: 2 },
  ].forEach(({ year, month, day, daysSinceEpoch }) => {
    it(`${daysSinceEpoch} is ${year} ${month} ${day} `, () => assertThat(
      dayOfEpochToDate(daysSinceEpoch), equalTo({ year, month, day })));
  });
});

