import { assertThat, equalTo } from 'hamjest';
import { datesBetween } from '../index';



describe('listOfDatesBetween', () => {
  [
    { first: '2000-01-01', second: '2000-01-02', resultsIn: ['2000-01-01', '2000-01-02'] },
    { first: '2000-01-01T10:10', second: '2000-01-02', resultsIn: ['2000-01-01', '2000-01-02'] },
    { first: '2000-01-02', second: '2000-01-01', resultsIn: ['2000-01-02', '2000-01-01'] },
    {
      first: '2000-01-01T00:00:00+01:00',
      second: '2000-01-01T00:00:00+00:00',
      resultsIn: ['1999-12-31', '2000-01-01'],
    },
    { first: '', second: '', resultsIn: [] },
    { first: 'T10:00', second: 'T11:00', resultsIn: [] },
  ].forEach(({ first, second, resultsIn }) => {
    it(`${resultsIn} days between ${second} and ${first} `, () => assertThat(
      datesBetween(first, second), equalTo(resultsIn)));
  });

  it('dates between 2000-01-03 and 2000-01-01 responds correct dates', () => assertThat(
    datesBetween('2000-01-03', '2000-01-01'), equalTo([
      '2000-01-03',
      '2000-01-02',
      '2000-01-01',
    ])));

  it('can be curried', () => assertThat(
    datesBetween('T10:00')('T11:00'), equalTo([])));
});
