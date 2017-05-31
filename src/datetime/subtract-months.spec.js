import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractMonths from './subtract-months';

describe('subtractMonths', () => {
  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths(1, '2000-02-01'), equalTo('2000-01-01')));

  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths(1, '2001-01-01'), equalTo('2000-12-01')));

  it('subtract -1 month from 2000-01-01 results in 2000-02-01', () => assertThat(
    subtractMonths(-1, '2000-01-01'), equalTo('2000-02-01')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    subtractMonths(-1, 'I\'m invalid'), equalTo(INVALID_DATETIME)));
});
