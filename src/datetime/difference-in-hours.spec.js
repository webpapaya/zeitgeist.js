import { assertThat, equalTo } from 'hamjest';
import differenceInHours from './difference-in-hours';

describe.skip('hours between', () => {
  it('T10:00 and T11:00 is 1 hour ', () => assertThat(
    differenceInHours('T11:00', 'T10:00'), equalTo(1)));

  it('2000-01-01T10:00:00+00:00 and 2000-01-01T10:00:00+01:00 is 1 hour', () => assertThat(
    differenceInHours('2000-01-01T10:00:00+00:00', '2000-01-01T10:00:00+01:00'), equalTo(1)));

  it('2000-01-01T10:00:00+01:00 and 2000-01-01T10:00:00+01:00 is 0 hours', () => assertThat(
    differenceInHours('2000-01-01T10:00:00+01:00', '2000-01-01T10:00:00+01:00'), equalTo(0)));

  it('2000-01-01T10:00:00+01:00 and 2000-01-01T10:00:00+00:00 is -1 hours', () => assertThat(
    differenceInHours('2000-01-01T10:00:00+01:00', '2000-01-01T10:00:00+00:00'), equalTo(-1)));

  it('can be curried ', () => assertThat(
    differenceInHours('T11:00')('T10:00'), equalTo(1)));
});

