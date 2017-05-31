import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addDuration from './add-duration';

describe('addDuration', () => {
  [
    { date: '2000-01-01T00:00:00', plusDuration: 'P1Y', resultsIn: '2001-01-01T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'P1M', resultsIn: '2000-02-01T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'P1D', resultsIn: '2000-01-02T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'PT1H', resultsIn: '2000-01-01T01:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'PT1M', resultsIn: '2000-01-01T00:01:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'PT1S', resultsIn: '2000-01-01T00:00:01' },
    { date: '2000-01-01T00:00:00+00:01', plusDuration: 'PT1S', resultsIn: '2000-01-01T00:00:01+00:01' },
    { date: 'I\'m invalid', plusDuration: 'PT1S', resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusDuration, resultsIn }) => {
    it(`${plusDuration} to ${date} results in ${resultsIn}`, () => assertThat(
      addDuration(plusDuration, date), equalTo(resultsIn)));
  });
});
