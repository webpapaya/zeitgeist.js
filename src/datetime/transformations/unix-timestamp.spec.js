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
