import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractYears from './subtract-years';

describe('subtractYears', () => {
  it('subtract 1 year from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractYears(1, '2001-01-01'), equalTo('2000-01-01')));

  it('adding 10 year to 2010-01-01 results in 2000-01-01', () => assertThat(
    subtractYears(10, '2010-01-01'), equalTo('2000-01-01')));

  it('subtract -1 years from 2000-01-01 results in 2001-01-01', () => assertThat(
    subtractYears(-1, '2000-01-01'), equalTo('2001-01-01')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    subtractYears(-1, 'I\'m invalid'), equalTo(INVALID_DATETIME)));
});
