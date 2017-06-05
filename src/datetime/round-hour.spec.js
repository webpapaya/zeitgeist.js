import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import roundHour from './round-hour';

describe('roundHour', () => {
  it('2000-01-01T11:12:13.123 is floored', () => assertThat(
    roundHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00.000')));

  it('2000-01-01T11:31:13.123 is ceiled', () => assertThat(
    roundHour('2000-01-01T12:31:13.123'), equalTo('2000-01-01T13:00:00.000')));

  it('2000-01-01T11:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
    roundHour('2000-01-01T12:31:13.123+10:00'), equalTo('2000-01-01T13:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    roundHour('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
