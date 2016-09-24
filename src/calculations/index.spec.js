import { assertThat, equalTo } from 'hamjest';
import {
  normalize,

  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,

  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractMonths,
  subtractYears,
} from '../index';

describe('normalize', () => {
  it('2001-01-01T00:00:60 gets normalized to 2001-01-01T00:01:00', () => assertThat(
    normalize('2001-01-01T00:00:60', 1), equalTo('2001-01-01T00:01:00')));

  it('2001-01-01T00:00:90 gets normalized to 2001-01-01T00:01:30', () => assertThat(
    normalize('2001-01-01T00:00:90', 1), equalTo('2001-01-01T00:01:30')));
});

describe('addSeconds', () => {
  [
    { date: '2001-01-01T00:00:00', plusSeconds: 1, resultsIn: '2001-01-01T00:00:01' },
    { date: '2001-01-01T00:59:59', plusSeconds: 1, resultsIn: '2001-01-01T01:00:00' },
    { date: '2001-01-01T00:59:58', plusSeconds: 1, resultsIn: '2001-01-01T00:59:59' },
    { date: '2001-01-01T23:59:59', plusSeconds: 1, resultsIn: '2001-01-02T00:00:00' },
    { date: '2001-01-01T00:00:00', plusSeconds: 2, resultsIn: '2001-01-01T00:00:02' },
    { date: '2001-01-01T00:00:00', plusSeconds: 60, resultsIn: '2001-01-01T00:01:00' },
  ].forEach(({ date, plusSeconds, resultsIn }) => {
    it(`${plusSeconds} to ${date} results in ${resultsIn}`, () => assertThat(
      addSeconds(date, plusSeconds), equalTo(resultsIn)));
  });
});

describe('addMinutes', () => {
  [
    { date: '2001-01-01T01:00:00', plusMinutes: -1, resultsIn: '2001-01-01T00:59:00' },
    { date: '2001-01-01T00:00:00', plusMinutes: 0.5, resultsIn: '2001-01-01T00:00:30' },
    { date: '2001-01-01T00:00:00', plusMinutes: 1, resultsIn: '2001-01-01T00:01:00' },
    { date: '2001-01-01T00:59:00', plusMinutes: 1, resultsIn: '2001-01-01T01:00:00' },
  ].forEach(({ date, plusMinutes, resultsIn }) => {
    it(`${plusMinutes} to ${date} results in ${resultsIn}`, () => assertThat(
      addMinutes(date, plusMinutes), equalTo(resultsIn)));
  });
});

describe('addHours', () => {
  it('1 hour to 2001-01-01T00:00:00 results in 2001-01-01T01:00:00', () => assertThat(
    addHours('2001-01-01T00:00:00', 1), equalTo('2001-01-01T01:00:00')));

  it('-1 hour to 2001-01-01T01:00:00 results in 2001-01-01T00:00:00', () => assertThat(
    addHours('2001-01-01T01:00:00', -1), equalTo('2001-01-01T00:00:00')));
});

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
  ].forEach(({ date, plusDays, resultsIn }) => {
    it(`${plusDays} to ${date} results in ${resultsIn}`, () => assertThat(
      addDays(date, plusDays), equalTo(resultsIn)));
  });
});

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
    { date: '2000-01-01', plusMonths: 12 * 1000, resultsIn: '3000-01-01' },
  ].forEach(({ date, plusMonths, resultsIn }) => {
    it(`${plusMonths} to ${date} results in ${resultsIn}`, () => assertThat(
      addMonths(date, plusMonths), equalTo(resultsIn)));
  });
});

describe('addYears', () => {
  it('1 to 2000-01-01 results in 2001-01-01', () => assertThat(
    addYears('2000-01-01', 1), equalTo('2001-01-01')));

  it('10 to 2000-01-01 results in 2010-01-01', () => assertThat(
    addYears('2000-01-01', 10), equalTo('2010-01-01')));

  it('-1 to 2001-01-01 results in 2000-01-01', () => assertThat(
    addYears('2001-01-01', -1), equalTo('2000-01-01')));
});

describe('subtractDays', () => {
  it('subtract 1 day from 2000-01-02 results in 2000-01-01', () => assertThat(
    subtractDays('2000-01-02T00:00:00', 1), equalTo('2000-01-01T00:00:00')));

  it('subtract 31 days from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractDays('2000-02-01T00:00:00', 31), equalTo('2000-01-01T00:00:00')));

  it('subtract 31 + 29 days from 2000-03-01 results in 2000-01-01', () => assertThat(
    subtractDays('2000-03-01T00:00:00', 60), equalTo('2000-01-01T00:00:00')));

  it('subtract 1 day from 2001-01-01 results in 2000-12-31', () => assertThat(
    subtractDays('2001-01-01T00:00:00', 1), equalTo('2000-12-31T00:00:00')));

  it('subtract 2 days from 2000-02-02 results in 2000-01-31', () => assertThat(
    subtractDays('2000-02-02T00:00:00', 2), equalTo('2000-01-31T00:00:00')));

  it('subtract 365 days from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractDays('2001-01-01T00:00:00', 366), equalTo('2000-01-01T00:00:00')));

  it('subtract -1 day from 2000-12-31 results in 2001-01-01', () => assertThat(
    subtractDays('2000-12-31T00:00:00', -1), equalTo('2001-01-01T00:00:00')));
});

describe('subtractSeconds', () => {
  it('subtract 1 second from 2001-01-01T00:00:01 results in 2001-01-01T00:00:00', () => assertThat(
    subtractSeconds('2001-01-01T00:00:01', 1), equalTo('2001-01-01T00:00:00')));
});

describe('subtractMinutes', () => {
  it('subtract 1 minute from 2001-01-01T00:01:00 results in 2001-01-01T00:00:00', () => assertThat(
    subtractMinutes('2001-01-01T00:01:00', 1), equalTo('2001-01-01T00:00:00')));
});

describe('subtractHours', () => {
  it('subtract 1 hour from 2001-01-01T01:00:00 results in 2001-01-01T00:00:00', () => assertThat(
    subtractHours('2001-01-01T01:00:00', 1), equalTo('2001-01-01T00:00:00')));
});

describe('subtract months', () => {
  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths('2000-02-01', 1), equalTo('2000-01-01')));

  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths('2001-01-01', 1), equalTo('2000-12-01')));

  it('subtract -1 month from 2000-01-01 results in 2000-02-01', () => assertThat(
    subtractMonths('2000-01-01', -1), equalTo('2000-02-01')));
});

describe('subtractYears', () => {
  it('subtract 1 year from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractYears('2001-01-01', 1), equalTo('2000-01-01')));

  it('adding 10 year to 2010-01-01 results in 2000-01-01', () => assertThat(
    subtractYears('2010-01-01', 10), equalTo('2000-01-01')));

  it('subtract -1 years from 2000-01-01 results in 2001-01-01', () => assertThat(
    subtractYears('2000-01-01', -1), equalTo('2001-01-01')));
});
