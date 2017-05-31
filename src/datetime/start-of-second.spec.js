import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfSecond from './start-of-second';

describe('startOfSecond', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:12', () => assertThat(
    startOfSecond('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:12')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:12+10:00', () => assertThat(
    startOfSecond('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:12+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfSecond('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

