import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import roundSecond from './round-second';

describe('roundSecond', () => {
  it('2000-01-01T11:12:13.123 is floored', () => assertThat(
    roundSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13.000')));

  it('2000-01-01T11:12:31.123 is ceiled', () => {
    assertThat(
      roundSecond('2000-01-01T11:12:13.5'), equalTo('2000-01-01T11:12:14.0'));
  });

  it('2000-01-01T11:12:31.5+10:00 doesn\'t drop timezone', () => assertThat(
    roundSecond('2000-01-01T11:12:13.5+10:00'), equalTo('2000-01-01T11:12:14.0+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    roundSecond('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
