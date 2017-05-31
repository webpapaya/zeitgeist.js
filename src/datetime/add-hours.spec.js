import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from './constants';
import addHours from './add-hours';

describe('addHours', () => {
  [
    { date: '2000-01-01T00:00:00', plusHours: 1, resultsIn: '2000-01-01T01:00:00' },
    { date: '2000-01-01T01:00:00', plusHours: -1, resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T01:00:00+10:10', plusHours: -1, resultsIn: '2000-01-01T00:00:00+10:10' },
    { date: 'I\'m invalid', plusHours: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusHours, resultsIn }) => {
    it(`${plusHours} to ${date} results in ${resultsIn}`, () => assertThat(
      addHours(plusHours, date), equalTo(resultsIn)));
  });
});
;
