import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import startOfYear from './start-of-year';

describe('startOfYear', () => {
  it('2000-02-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfYear('2000-02-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('2000-02-02T10:11:12.12+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    startOfYear('2000-02-02T10:11:12.12+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfYear('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
