import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractMicroseconds from './subtract-microseconds';

describe('subtractMicroseconds', () => {
  [
    // TODO: fix me
    // { date: '2001-01-01T00:00:00.000001', subMicrosecond: 1, resultsIn: '2001-01-01T00:00:00.000000' },
    { date: '2001-01-01T01:00:00.000000', subMicrosecond: 1, resultsIn: '2001-01-01T00:59:59.999999' },
    { date: 'I\'m invalid', subMicrosecond: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, subMicrosecond, resultsIn }) => {
    it(`${subMicrosecond} to ${date} results in ${resultsIn}`, () => assertThat(
      subtractMicroseconds(subMicrosecond, date), equalTo(resultsIn)));
  });

  it('can be curried', () => {
    const subtract2Microseconds = subtractMicroseconds(2);
    assertThat(subtract2Microseconds('2001-01-01T00:00:00.000002'), equalTo('2001-01-01T00:00:00'));
  });
});
