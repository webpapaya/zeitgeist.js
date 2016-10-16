import { assertThat, equalTo } from 'hamjest';
import { fromUnixTimestamp, toUnixTimestamp } from '../index';

describe('fromUnixTimestamp', () => {
  it('unix timestamp 0 responds 1700-01-01T00:00:00', () => assertThat(
    fromUnixTimestamp(0), equalTo('1700-01-01T00:00:00')));

  it('unix timestamp 1 responds 1700-01-01T00:00:01', () => assertThat(
    fromUnixTimestamp(1), equalTo('1700-01-01T00:00:01')));
});

describe('toUnixTimestamp', () => {
  it('1700-01-01T00:00:00 responds 0', () => assertThat(
    toUnixTimestamp('1700-01-01T00:00:00'), equalTo(0)));

  it('unix timestamp 1 responds 1700-01-01T00:00:01', () => assertThat(
    toUnixTimestamp('1700-01-01T00:00:01'), equalTo(1)));
});