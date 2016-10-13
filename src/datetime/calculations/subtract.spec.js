import { assertThat, equalTo } from 'hamjest';
import {
  subtractDuration,
  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractMonths,
  subtractYears,
} from '../index';

describe('subtractDuration', () => {
  [
    { date: '2001-01-01T00:00:00', minusDuration: 'P1Y', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-02-01T00:00:00', minusDuration: 'P1M', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-02T00:00:00', minusDuration: 'P1D', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T01:00:00', minusDuration: 'PT1H', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T00:01:00', minusDuration: 'PT1M', resultsIn: '2000-01-01T00:00:00' },
    { date: '2000-01-01T00:00:01', minusDuration: 'PT1S', resultsIn: '2000-01-01T00:00:00' },
  ].forEach(({ date, minusDuration, resultsIn }) => {
    it(`${minusDuration} to ${date} results in ${resultsIn}`, () => assertThat(
      subtractDuration(date, minusDuration), equalTo(resultsIn)));
  });
});

describe('subtractDays', () => {
  it('subtract 1 day from 2000-01-02 results in 2000-01-01', () => assertThat(
    subtractDays(1, '2000-01-02T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract 31 days from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractDays(31, '2000-02-01T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract 31 + 29 days from 2000-03-01 results in 2000-01-01', () => assertThat(
    subtractDays(60, '2000-03-01T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract 1 day from 2001-01-01 results in 2000-12-31', () => assertThat(
    subtractDays(1, '2001-01-01T00:00:00'), equalTo('2000-12-31T00:00:00')));

  it('subtract 2 days from 2000-02-02 results in 2000-01-31', () => assertThat(
    subtractDays(2, '2000-02-02T00:00:00'), equalTo('2000-01-31T00:00:00')));

  it('subtract 365 days from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractDays(366, '2001-01-01T00:00:00'), equalTo('2000-01-01T00:00:00')));

  it('subtract -1 day from 2000-12-31 results in 2001-01-01', () => assertThat(
    subtractDays(-1, '2000-12-31T00:00:00'), equalTo('2001-01-01T00:00:00')));
});

describe('subtractSeconds', () => {
  it('subtract 1 second from 2001-01-01T00:00:01 results in 2001-01-01T00:00:00', () => assertThat(
    subtractSeconds(1, '2001-01-01T00:00:01'), equalTo('2001-01-01T00:00:00')));
});

describe('subtractMinutes', () => {
  it('subtract 1 minute from 2001-01-01T00:01:00 results in 2001-01-01T00:00:00', () => assertThat(
    subtractMinutes(1, '2001-01-01T00:01:00'), equalTo('2001-01-01T00:00:00')));
});

describe('subtractHours', () => {
  it('subtract 1 hour from 2001-01-01T01:00:00 results in 2001-01-01T00:00:00', () => assertThat(
    subtractHours(1, '2001-01-01T01:00:00'), equalTo('2001-01-01T00:00:00')));
});

describe('subtract months', () => {
  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths(1, '2000-02-01'), equalTo('2000-01-01')));

  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths(1, '2001-01-01'), equalTo('2000-12-01')));

  it('subtract -1 month from 2000-01-01 results in 2000-02-01', () => assertThat(
    subtractMonths(-1, '2000-01-01'), equalTo('2000-02-01')));
});

describe('subtractYears', () => {
  it('subtract 1 year from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractYears(1, '2001-01-01'), equalTo('2000-01-01')));

  it('adding 10 year to 2010-01-01 results in 2000-01-01', () => assertThat(
    subtractYears(10, '2010-01-01'), equalTo('2000-01-01')));

  it('subtract -1 years from 2000-01-01 results in 2001-01-01', () => assertThat(
    subtractYears(-1, '2000-01-01'), equalTo('2001-01-01')));
});
