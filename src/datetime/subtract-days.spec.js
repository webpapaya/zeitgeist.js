import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractDays from './subtract-days';

describe('subtractDays', () => {
  it('subtract 1 day from 2000-01-02 results in 2000-01-01', () => assertThat(
    subtractDays(1, '2000-01-02T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract 31 days from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractDays(31, '2000-02-01T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract 31 + 29 days from 2000-03-01 results in 2000-01-01', () => assertThat(
    subtractDays(60, '2000-03-01T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract 1 day from 2001-01-01 results in 2000-12-31', () => assertThat(
    subtractDays(1, '2001-01-01T00:00:00'), equalTo('2000-12-31T00:00:00')));

  it('subtract 2 days from 2000-02-02 results in 2000-01-31', () => assertThat(
    subtractDays(2, '2000-02-02T00:00:00'), equalTo('2000-01-31T00:00:00')));

  it('subtract 365 days from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractDays(366, '2001-01-01T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract -1 day from 2000-12-31 results in 2001-01-01', () => assertThat(
    subtractDays(-1, '2000-12-31T00:00:00'), equalTo('2001-01-01T00:00:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    subtractDays(-1, 'I\'m invalid'), equalTo(INVALID_DATETIME)));
});

