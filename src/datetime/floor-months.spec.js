import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import floorMonths from './floor-months';

describe('floorMonths', () => {
  it('2000-01-05T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
    floorMonths('2000-01-05T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

  it('2000-01-05T11:12:13.123+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    floorMonths('2000-01-05T11:12:13.123+10:00'), equalTo('2000-01-01T00:00:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    floorMonths('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});
