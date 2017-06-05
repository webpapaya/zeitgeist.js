import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import endOfMinute from './end-of-minute';

describe('endOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:59.99', () => assertThat(
    endOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:59.99+10:00', () => assertThat(
    endOfMinute('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfMinute('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

