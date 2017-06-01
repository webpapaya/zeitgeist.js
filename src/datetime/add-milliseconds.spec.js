import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addMilliseconds from './add-milliseconds';

describe('addMilliseconds', () => {
  [
    { date: '2001-01-01T00:00:00.000', plusMillisecond: 1, resultsIn: '2001-01-01T00:00:00.001' },
    { date: '2001-01-01T00:59:59.999', plusMillisecond: 1, resultsIn: '2001-01-01T01:00:00.000' },
    { date: 'I\'m invalid', plusMillisecond: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusMillisecond, resultsIn }) => {
    it(`${plusMillisecond} to ${date} results in ${resultsIn}`, () => assertThat(
      addMilliseconds(plusMillisecond, date), equalTo(resultsIn)));
  });
});
