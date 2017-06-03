import { assertThat, equalTo } from 'hamjest';
import differenceInMicroseconds from './difference-in-microseconds';

describe('differenceInMicroseconds', () => {
  it('T10:01 and T10:00 is 60e6 microseconds', () => assertThat(
    differenceInMicroseconds('T10:01', 'T10:00'), equalTo(60e6)));

  it('can be curried', () => assertThat(
    differenceInMicroseconds('T10:01')('T10:00'), equalTo(60e6)));
});
