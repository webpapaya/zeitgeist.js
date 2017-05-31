import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addMicroseconds from './add-microseconds';

describe('addMicroseconds', () => {
  [
    { date: '2001-01-01T00:00:00.000000', plusMicrosecond: 1, resultsIn: '2001-01-01T00:00:00.000001' },
    { date: '2001-01-01T00:59:59.999999', plusMicrosecond: 1, resultsIn: '2001-01-01T01:00:00' },
    { date: 'I\'m invalid', plusMicrosecond: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusMicrosecond, resultsIn }) => {
    it(`${plusMicrosecond} to ${date} results in ${resultsIn}`, () => assertThat(
      addMicroseconds(plusMicrosecond, date), equalTo(resultsIn)));
  });

  it('can be curried', () => {
    const add2Microseconds = addMicroseconds(2);
    assertThat(add2Microseconds('2001-01-01T00:00:00.000000'), equalTo('2001-01-01T00:00:00.000002'));
  });
});
