import { assertThat, equalTo } from 'hamjest';

import fromUnixTimestamp from './from-unix-timestamp';
import toUnixTimestamp from './to-unix-timestamp';

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
