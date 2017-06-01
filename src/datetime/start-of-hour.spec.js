import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfHour from './start-of-hour';

describe('startOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:00:00', () => assertThat(
    startOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:00:00.00')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:00:00+10:00', () => assertThat(
    startOfHour('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:00:00.00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfHour('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
