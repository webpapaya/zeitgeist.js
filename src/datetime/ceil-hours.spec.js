import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import ceilHours from './ceil-hours';

describe('ceilHours', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-01T12:00:00', () => assertThat(
    ceilHours('2000-01-01T11:12:13.123'), equalTo('2000-01-01T12:00:00.000')));

  it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T12:00:00+10:00', () => assertThat(
    ceilHours('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T12:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    ceilHours('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});

