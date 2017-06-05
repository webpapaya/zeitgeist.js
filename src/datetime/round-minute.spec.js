import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import roundMinute from './round-minute';

describe('roundMinute', () => {
  it('2000-01-01T11:12:13.123 is floored', () => assertThat(
    roundMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00.000')));

  it('2000-01-01T11:31:13.123 ceiled', () => assertThat(
    roundMinute('2000-01-01T11:31:31.123'), equalTo('2000-01-01T11:32:00.000')));

  it('2000-01-01T11:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
    roundMinute('2000-01-01T11:31:31.123+10:00'), equalTo('2000-01-01T11:32:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    roundMinute('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
