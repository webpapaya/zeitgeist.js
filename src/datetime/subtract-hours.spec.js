import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractHours from './subtract-hours';

describe('subtractHours', () => {
  it('subtract 1 hour from 2001-01-01T01:00:00 results in 2001-01-01T00:00:00', () => assertThat(
    subtractHours(1, '2001-01-01T01:00:00'), equalTo('2001-01-01T00:00:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    subtractHours(-1, 'I\'m invalid'), equalTo(INVALID_DATETIME)));
});

