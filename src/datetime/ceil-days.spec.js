import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import ceilDays from './ceil-days';

describe('ceilDays', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-02T00:00:00', () => assertThat(
    ceilDays('2000-01-01T11:12:13.123'), equalTo('2000-01-02T00:00:00.000')));

  it('2000-01-01T11:12:13.123+10:00 results in 2000-01-02T00:00:00+10:00', () => assertThat(
    ceilDays('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-02T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    ceilDays('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});

