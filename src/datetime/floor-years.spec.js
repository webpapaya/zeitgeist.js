import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import floorYears from './floor-years';

describe('floorYears', () => {
  it('2000-02-05T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
    floorYears('2000-02-05T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

  it('2000-02-05T11:12:13.123+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    floorYears('2000-02-05T11:12:13.123+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    floorYears('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});

