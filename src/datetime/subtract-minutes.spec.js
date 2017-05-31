import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractMinutes from './subtract-minutes';

describe('subtractMinutes', () => {
  it('subtract 1 minute from 2001-01-01T00:01:00 results in 2001-01-01T00:00:00', () => assertThat(
    subtractMinutes(1, '2001-01-01T00:01:00'), equalTo('2001-01-01T00:00:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    subtractMinutes(-1, 'I\'m invalid'), equalTo(INVALID_DATETIME)));
});

