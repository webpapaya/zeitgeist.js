import { assertThat, equalTo } from 'hamjest';
import differenceInMinutes from './difference-in-minutes';

describe.skip('differenceInMinutes', () => {
  it('T10:00 and T11:00 is 60 minutes', () => assertThat(
    differenceInMinutes('T11:00', 'T10:00'), equalTo(60)));

  it('2000-01-01T10:00:00+00:00 and 2000-01-01T10:00:00+00:15 is 15 minutes', () => assertThat(
    differenceInMinutes('2000-01-01T10:00:00+00:00', '2000-01-01T10:00:00+00:15'), equalTo(15)));

  it('can be curried', () => assertThat(
    differenceInMinutes('T11:00')('T10:00'), equalTo(60)));
});
