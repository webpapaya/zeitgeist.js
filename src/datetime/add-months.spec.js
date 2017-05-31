import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addMonths from './add-months';

describe('addMonths', () => {
  [
    { date: '2001-02-01', plusMonths: -13, resultsIn: '2000-01-01' },
    { date: '2000-01-01', plusMonths: -1, resultsIn: '1999-12-01' },
    { date: '2000-02-01', plusMonths: -1, resultsIn: '2000-01-01' },
    { date: '2000-01-01', plusMonths: 0, resultsIn: '2000-01-01' },
    { date: '2000-01-01', plusMonths: 1, resultsIn: '2000-02-01' },
    { date: '2000-01-01', plusMonths: 12, resultsIn: '2001-01-01' },
    { date: '2000-01-01', plusMonths: 13, resultsIn: '2001-02-01' },
    { date: '2000-01-01', plusMonths: 14, resultsIn: '2001-03-01' },
    { date: '2000-01-01', plusMonths: 24, resultsIn: '2002-01-01' },
    { date: '2000-01-01T00:00:00+10:00', plusMonths: 1, resultsIn: '2000-02-01T00:00:00+10:00' },
    { date: '2000-01-01', plusMonths: 12 * 1000, resultsIn: '3000-01-01' },
    { date: 'I\'m invalid', plusMonths: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusMonths, resultsIn }) => {
    it(`${plusMonths} to ${date} results in ${resultsIn}`, () => assertThat(
      addMonths(plusMonths, date), equalTo(resultsIn)));
  });
});
