import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import floorDays from './floor-day';

describe('floorDays', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-01T00:00:00.000', () => assertThat(
    floorDays('2000-01-01T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

  it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    floorDays('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    floorDays('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
