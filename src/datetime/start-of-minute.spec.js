import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfMinute from './start-of-minute';

describe('startOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:00', () => assertThat(
    startOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:00')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:00+10:00', () => assertThat(
    startOfMinute('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfMinute('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
