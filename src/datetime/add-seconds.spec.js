import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addSeconds from './add-seconds';

describe('addSeconds', () => {
  [
    { date: '2001-01-01T00:00:00', plusSeconds: 1, resultsIn: '2001-01-01T00:00:01' },
    { date: '2001-01-01T00:59:59', plusSeconds: 1, resultsIn: '2001-01-01T01:00:00' },
    { date: '2001-01-01T00:59:58', plusSeconds: 1, resultsIn: '2001-01-01T00:59:59' },
    { date: '2001-01-01T23:59:59', plusSeconds: 1, resultsIn: '2001-01-02T00:00:00' },
    { date: '2001-01-01T00:00:00', plusSeconds: 2, resultsIn: '2001-01-01T00:00:02' },
    { date: '2001-01-01T00:00:00', plusSeconds: 60, resultsIn: '2001-01-01T00:01:00' },
    { date: '2001-01-01T00:00:00+10:10', plusSeconds: 60, resultsIn: '2001-01-01T00:01:00+10:10' },
    { date: 'I\'m invalid', plusSeconds: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusSeconds, resultsIn }) => {
    it(`${plusSeconds} to ${date} results in ${resultsIn}`, () => assertThat(
      addSeconds(plusSeconds, date), equalTo(resultsIn)));
  });
});
