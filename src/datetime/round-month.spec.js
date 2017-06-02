import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import roundMonth from './round-month';

describe('roundMonth', () => {
  it('2000-01-02T11:12:13.123 is floored', () => assertThat(
    roundMonth('2000-01-02T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

  it('2000-01-16T12:31:13.123 is ceiled', () => assertThat(
    roundMonth('2000-01-16T12:31:13.123'), equalTo('2000-02-01T00:00:00.000')));

  it('2000-01-16T12:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
    roundMonth('2000-01-16T12:31:13.123+10:00'), equalTo('2000-02-01T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    roundMonth('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
