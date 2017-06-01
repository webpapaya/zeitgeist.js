import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import endOfSecond from './end-of-second';

describe('endOfSecond', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:12.99', () => assertThat(
    endOfSecond('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:12.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:12.999999+10:00', () => assertThat(
    endOfSecond('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:12.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfSecond('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

