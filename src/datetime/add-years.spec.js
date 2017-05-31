import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addYears from './add-years';

describe('addYears', () => {
  [
    { date: '2000-01-01', plusYears: 1, resultsIn: '2001-01-01' },
    { date: '2001-01-01', plusYears: -1, resultsIn: '2000-01-01' },
    { date: '2000-01-01', plusYears: 10, resultsIn: '2010-01-01' },
    { date: '2000-01-01T00:00:00+10:00', plusYears: 10, resultsIn: '2010-01-01T00:00:00+10:00' },
    { date: 'I\'m invalid', plusYears: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusYears, resultsIn }) => {
    it(`${plusYears} to ${date} results in ${resultsIn}`, () => assertThat(
      addYears(plusYears, date), equalTo(resultsIn)));
  });
});
