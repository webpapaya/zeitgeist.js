import { assertThat, equalTo } from 'hamjest';
import differenceInMilliseconds from './difference-in-milliseconds';

describe('differenceInMilliseconds', () => {
  it('T10:01 and T10:00 is 60e3 milliseconds', () => assertThat(
    differenceInMilliseconds('T10:01', 'T10:00'), equalTo(60e3)));

  it('can be curried', () => assertThat(
    differenceInMilliseconds('T10:01')('T10:00'), equalTo(60e3)));
});
