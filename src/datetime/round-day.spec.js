import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import roundDay from './round-day';
describe('roundDay', () => {
  it('2000-01-01T11:12:13.123 is floored', () => assertThat(
    roundDay('2000-01-01T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

  it('2000-01-01T12:31:13.123 is ceiled', () => assertThat(
    roundDay('2000-01-01T12:31:13.123'), equalTo('2000-01-02T00:00:00.000')));

  it('2000-01-01T12:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
    roundDay('2000-01-01T12:31:13.123+10:00'), equalTo('2000-01-02T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    roundDay('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
