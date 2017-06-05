import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfMonth from './start-of-month';

describe('startOfMonth', () => {
  it('2000-01-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfMonth('2000-01-02T10:11:12.12'), equalTo('2000-01-01T00:00:00.00')));

  it('2000-01-02T10:11:12.12+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    startOfMonth('2000-01-02T10:11:12.12+10:00'), equalTo('2000-01-01T00:00:00.00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfMonth('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
