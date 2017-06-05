import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';

import roundYear from './round-year';

describe('roundYear', () => {
  it('2000-02-01T11:12:13.123 is floored', () => assertThat(
    roundYear('2000-02-01T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

  it('2000-06-16T12:31:13.123 is ceiled', () => assertThat(
    roundYear('2000-06-16T12:31:13.123'), equalTo('2001-01-01T00:00:00.000')));

  it('2000-05-60T12:31:13.123 is ceiled', () => assertThat(
    roundYear('2000-05-60T12:31:13.123'), equalTo('2001-01-01T00:00:00.000')));

  it('2000-05-60T12:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
    roundYear('2000-06-01T12:31:13.123+10:00'), equalTo('2001-01-01T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    roundYear('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
