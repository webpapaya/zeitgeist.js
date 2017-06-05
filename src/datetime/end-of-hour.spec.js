import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import endOfHour from './end-of-hour';

describe('endOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:59:59.99', () => assertThat(
    endOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:59:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:59:59.99+10:00', () => assertThat(
    endOfHour('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:59:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfHour('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

