import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractSeconds from './subtract-seconds';

describe('subtractSeconds', () => {
  it('subtract 1 second from 2001-01-01T00:00:01 results in 2001-01-01T00:00:00', () => assertThat(
    subtractSeconds(1, '2001-01-01T00:00:01'), equalTo('2001-01-01T00:00:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    subtractSeconds(-1, 'I\'m invalid'), equalTo(INVALID_DATETIME)));
});

