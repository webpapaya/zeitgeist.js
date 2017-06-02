import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import ceilYears from './ceil-years';

describe('ceilYears', () => {
  it('2000-01-01T11:12:13.123 results in 2001-00-01T00:00:00', () => assertThat(
    ceilYears('2000-01-01T11:12:13.123'), equalTo('2001-01-01T00:00:00.000')));

  it('2000-01-01 results in 2001-00-01', () => assertThat(
    ceilYears('2000-01-01'), equalTo('2001-01-01')));

  it('2000-01-01T11:12:13.123+10:00 results in 2001-00-01T00:00:00+10:00', () => assertThat(
    ceilYears('2000-01-01T11:12:13.123+10:00'), equalTo('2001-01-01T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    ceilYears('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
