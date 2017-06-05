import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import ceilSeconds from './ceil-second';

describe('ceilSeconds', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:14', () => assertThat(
    ceilSeconds('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:14.000')));

  it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T11:12:14+10:00', () => assertThat(
    ceilSeconds('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T11:12:14.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    ceilSeconds('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
