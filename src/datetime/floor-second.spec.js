import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import floorSeconds from './floor-second';

describe('floorSecond', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
    floorSeconds('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13.000')));

  it('2000-01-01T11:12:13.123+01:00 results in 2000-01-01T11:12:13+01:00', () => assertThat(
    floorSeconds('2000-01-01T11:12:13.123+01:00'), equalTo('2000-01-01T11:12:13.000+01:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    floorSeconds('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
