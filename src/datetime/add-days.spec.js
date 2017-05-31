import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addDays from './add-days';

describe('addDays', () => {
  [
    { date: '2000-01-01T00:00:00', plusDays: 1, resultsIn: '2000-01-02T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDays: 31, resultsIn: '2000-02-01T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDays: 31 + 29, resultsIn: '2000-03-01T00:00:00' },
    { date: '2000-01-31T00:00:00', plusDays: 1, resultsIn: '2000-02-01T00:00:00' },
    { date: '2000-01-31T00:00:00', plusDays: 2, resultsIn: '2000-02-02T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDays: 366, resultsIn: '2001-01-01T00:00:00' },
    { date: '2001-01-01T00:00:00', plusDays: 365, resultsIn: '2002-01-01T00:00:00' },
    { date: '2001-01-01T00:00:00', plusDays: -1, resultsIn: '2000-12-31T00:00:00' },
    { date: '2001-01-01T00:00:00+10:10', plusDays: -1, resultsIn: '2000-12-31T00:00:00+10:10' },
    { date: 'I\'m invalid', plusDays: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusDays, resultsIn }) => {
    it(`${plusDays} to ${date} results in ${resultsIn}`, () => assertThat(
      addDays(plusDays, date), equalTo(resultsIn)));
  });
});

