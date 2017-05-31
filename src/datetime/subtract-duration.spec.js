import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import subtractDuration from './subtract-duration';

describe('subtractDuration', () => {
  [
    { date: '2001-01-01T00:00:00', minusDuration: 'P1Y', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-02-01T00:00:00', minusDuration: 'P1M', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-02T00:00:00', minusDuration: 'P1D', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T01:00:00', minusDuration: 'PT1H', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T00:01:00', minusDuration: 'PT1M', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T00:00:01', minusDuration: 'PT1S', resultsIn: '2000-01-01T00:00:00' },
    { date: 'I\'m invalid', minusDuration: 'PT1S', resultsIn: INVALID_DATETIME },
  ].forEach(({ date, minusDuration, resultsIn }) => {
    it(`${minusDuration} to ${date} results in ${resultsIn}`, () => assertThat(
      subtractDuration(minusDuration, date), equalTo(resultsIn)));
  });
});
