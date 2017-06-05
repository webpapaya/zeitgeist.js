import { assertThat, equalTo } from 'hamjest';
import differenceInCalendarDates from './difference-in-calendar-dates';

describe('differenceInCalendarDates', () => {
  [
    { firstDate: '2000-01-02T00:00', secondDate: '2000-01-01T23:59', resultsIn: -1 },
    { firstDate: '1700-01-01T00:00:00', secondDate: '1700-01-01T00:00:00', resultsIn: 0 },
    { firstDate: '2000-01-01', secondDate: '2000-01-01', resultsIn: 0 },
    { firstDate: '2000-01-01', secondDate: '2000-01-02', resultsIn: 1 },
    { firstDate: '2001-01-01', secondDate: '2000-12-31', resultsIn: -1 },
    { firstDate: '2000-12-31', secondDate: '2001-01-01', resultsIn: 1 },
    { firstDate: '2000-01-02', secondDate: '2001-01-01', resultsIn: 365 },
    { firstDate: '2000-01-02', secondDate: '2000-01-01', resultsIn: -1 },
    { firstDate: '2000-01-01', secondDate: '2001-01-01', resultsIn: 366, description: 'leap year' },
  ].forEach(({ firstDate, secondDate, resultsIn }) => {
    it(`${resultsIn} days between ${secondDate} and ${firstDate} `, () => assertThat(
      differenceInCalendarDates(firstDate, secondDate), equalTo(resultsIn)));
  });

  it('can be curried', () => assertThat(
    differenceInCalendarDates('2001-01-01')('2002-01-01'), equalTo(365)));
});
