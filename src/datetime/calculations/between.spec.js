import { assertThat, equalTo } from 'hamjest';
import {
  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,
  datesBetween,
  daysBetween,
} from '../index';

describe('microsecondsBetween', () => {
  it('T10:01 and T10:00 is 60e6 microseconds', () => assertThat(
    microsecondsBetween('T10:01', 'T10:00'), equalTo(60e6)));

  it('can be curried', () => assertThat(
    microsecondsBetween('T10:01')('T10:00'), equalTo(60e6)));
});

describe('millisecondsBetween', () => {
  it('T10:01 and T10:00 is 60e3 milliseconds', () => assertThat(
    millisecondsBetween('T10:01', 'T10:00'), equalTo(60e3)));

  it('can be curried', () => assertThat(
    millisecondsBetween('T10:01')('T10:00'), equalTo(60e3)));
});

describe('secondsBetween', () => {
  it('seconds between T10:01 and T10:00 is 60 seconds', () => assertThat(
    secondsBetween('T10:01', 'T10:00'), equalTo(60)));

  it('seconds between T10:01 and T10:00:01 is 59 seconds', () => assertThat(
    secondsBetween('T10:01', 'T10:00:01'), equalTo(59)));

  it('seconds between T11:00 and T10:59:00 is 60 seconds', () => assertThat(
    secondsBetween('T11:00', 'T10:59'), equalTo(60)));

  it('there are 60 seconds between 2000-01-02T00:00 and 2000-01-01T23:59', () => assertThat(
    secondsBetween('2000-01-02T00:00', '2000-01-01T23:59'), equalTo(60)));

  it('can be curried', () => assertThat(
    secondsBetween('2000-01-02T00:00')('2000-01-01T23:59'), equalTo(60)));

  it('unix timestamp 1700-01-01T00:00:00 responds 1699-12-31T23:59', () => assertThat(
    secondsBetween('1699-12-31T23:59', '1700-01-01T00:00:00'), equalTo(-60)));

  describe.skip('for now as the rest of zeitgeist cant\'t  handles leap seconds', () => {
    it('there are 2 seconds between 1972-07-01T00:00:00 and 1972-06-30T23:59:59', () => assertThat(
      secondsBetween('1972-07-01T00:00:00', '1972-06-30T23:59:59'), equalTo(2)));
  });
});

describe('minutes between', () => {
  it('T10:00 and T11:00 is 60 minutes', () => assertThat(
    minutesBetween('T11:00', 'T10:00'), equalTo(60)));

  it('2000-01-01T10:00:00+00:00 and 2000-01-01T10:00:00+00:15 is 15 minutes', () => assertThat(
    minutesBetween('2000-01-01T10:00:00+00:00', '2000-01-01T10:00:00+00:15'), equalTo(15)));

  it('can be curried', () => assertThat(
    minutesBetween('T11:00')('T10:00'), equalTo(60)));
});

describe('hours between', () => {
  it('T10:00 and T11:00 is 1 hour ', () => assertThat(
    hoursBetween('T11:00', 'T10:00'), equalTo(1)));

  it('2000-01-01T10:00:00+00:00 and 2000-01-01T10:00:00+01:00 is 1 hour', () => assertThat(
    hoursBetween('2000-01-01T10:00:00+00:00', '2000-01-01T10:00:00+01:00'), equalTo(1)));

  it('2000-01-01T10:00:00+01:00 and 2000-01-01T10:00:00+01:00 is 0 hours', () => assertThat(
    hoursBetween('2000-01-01T10:00:00+01:00', '2000-01-01T10:00:00+01:00'), equalTo(0)));

  it('2000-01-01T10:00:00+01:00 and 2000-01-01T10:00:00+00:00 is -1 hours', () => assertThat(
    hoursBetween('2000-01-01T10:00:00+01:00', '2000-01-01T10:00:00+00:00'), equalTo(-1)));

  it('can be curried ', () => assertThat(
    hoursBetween('T11:00')('T10:00'), equalTo(1)));
});

describe('daysBetween responds', () => {
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
      daysBetween(firstDate, secondDate), equalTo(resultsIn)));
  });

  it('can be curried', () => assertThat(
    daysBetween('2001-01-01')('2002-01-01'), equalTo(365)));
});

describe('dates between', () => {
  [
    { first: '2000-01-01', second: '2000-01-02', resultsIn: ['2000-01-01', '2000-01-02'] },
    { first: '2000-01-01T10:10', second: '2000-01-02', resultsIn: ['2000-01-01', '2000-01-02'] },
    { first: '2000-01-02', second: '2000-01-01', resultsIn: ['2000-01-02', '2000-01-01'] },
    { first: '2000-01-01T00:00:00+01:00', second: '2000-01-01T00:00:00+00:00', resultsIn: ['1999-12-31', '2000-01-01'] },
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
