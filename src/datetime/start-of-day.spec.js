import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfDay from './start-of-day';

describe('startOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T00:00:00.00')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    startOfDay('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T00:00:00.00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfDay('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
