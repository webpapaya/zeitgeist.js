import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addMinutes from './add-minutes';

describe('addMinutes', () => {
  [
    { date: '2001-01-01T01:00:00', plusMinutes: -1, resultsIn: '2001-01-01T00:59:00' },
    { date: '2001-01-01T00:00:00', plusMinutes: 0.5, resultsIn: '2001-01-01T00:00:30' },
    { date: '2001-01-01T00:00:00', plusMinutes: 1, resultsIn: '2001-01-01T00:01:00' },
    { date: '2001-01-01T00:59:00', plusMinutes: 1, resultsIn: '2001-01-01T01:00:00' },
    { date: '2001-01-01T00:59:00+10:10', plusMinutes: 1, resultsIn: '2001-01-01T01:00:00+10:10' },
    { date: 'I\'m invalid', plusMinutes: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusMinutes, resultsIn }) => {
    it(`${plusMinutes} to ${date} results in ${resultsIn}`, () => assertThat(
      addMinutes(plusMinutes, date), equalTo(resultsIn)));
  });
});
