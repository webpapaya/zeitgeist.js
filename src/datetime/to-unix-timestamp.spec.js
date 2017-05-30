import { assertThat, equalTo } from 'hamjest';
import toUnixTimestamp from './to-unix-timestamp';

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
