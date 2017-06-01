import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import floorMinutes from './floor-minutes';

describe('floorMinutes', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:00', () => assertThat(
    floorMinutes('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00.000')));

  it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T11:12:00+10:00', () => assertThat(
    floorMinutes('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T11:12:00.000+10:00')));

  it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
    floorMinutes('I\'m Invalid'), equalTo(INVALID_DATETIME)));
});

