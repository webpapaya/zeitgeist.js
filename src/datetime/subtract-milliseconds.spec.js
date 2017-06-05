import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractMilliseconds from './subtract-milliseconds';

describe('subtractMilliseconds', () => {
  [
    // TODO: fixme
    // { date: '2001-01-01T00:00:00.001', subtractMillisecond: 1, resultsIn: '2001-01-01T00:00:00.000' },
    { date: '2001-01-01T01:00:00.000', subtractMillisecond: 1, resultsIn: '2001-01-01T00:59:59.999' },
    { date: 'I\'m invalid', subtractMillisecond: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, subtractMillisecond, resultsIn }) => {
    it(`${subtractMillisecond} to ${date} results in ${resultsIn}`, () => assertThat(
      subtractMilliseconds(subtractMillisecond, date), equalTo(resultsIn)));
  });
});
