import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfWeek from './start-of-week';

describe('startOfWeek', () => {
  it('2000-01-01T10:11:12.12 results in 1999-12-27T00:00:00', () => assertThat(
    startOfWeek('2000-01-01T10:11:12.12'), equalTo('1999-12-27T00:00:00.00')));

  it('2000-01-01T10:11:12.12+10:00 results in 1999-12-27T00:00:00+10:00', () => assertThat(
    startOfWeek('2000-01-01T10:11:12.12+10:00'), equalTo('1999-12-27T00:00:00.00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfWeek('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

