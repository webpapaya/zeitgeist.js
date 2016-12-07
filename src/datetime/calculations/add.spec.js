import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from '../constants';
import {
  addDuration,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

describe('addDuration', () => {
  [
    { date: '2000-01-01T00:00:00', plusDuration: 'P1Y', resultsIn: '2001-01-01T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'P1M', resultsIn: '2000-02-01T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'P1D', resultsIn: '2000-01-02T00:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'PT1H', resultsIn: '2000-01-01T01:00:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'PT1M', resultsIn: '2000-01-01T00:01:00' },
    { date: '2000-01-01T00:00:00', plusDuration: 'PT1S', resultsIn: '2000-01-01T00:00:01' },
    { date: '2000-01-01T00:00:00+00:01', plusDuration: 'PT1S', resultsIn: '2000-01-01T00:00:01+00:01' },
    { date: 'I\'m invalid', plusDuration: 'PT1S', resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusDuration, resultsIn }) => {
    it(`${plusDuration} to ${date} results in ${resultsIn}`, () => assertThat(
      addDuration(plusDuration, date), equalTo(resultsIn)));
  });
});

describe('addSeconds', () => {
  [
    { date: '2001-01-01T00:00:00', plusSeconds: 1, resultsIn: '2001-01-01T00:00:01' },
    { date: '2001-01-01T00:59:59', plusSeconds: 1, resultsIn: '2001-01-01T01:00:00' },
    { date: '2001-01-01T00:59:58', plusSeconds: 1, resultsIn: '2001-01-01T00:59:59' },
    { date: '2001-01-01T23:59:59', plusSeconds: 1, resultsIn: '2001-01-02T00:00:00' },
    { date: '2001-01-01T00:00:00', plusSeconds: 2, resultsIn: '2001-01-01T00:00:02' },
    { date: '2001-01-01T00:00:00', plusSeconds: 60, resultsIn: '2001-01-01T00:01:00' },
    { date: 'I\'m invalid', plusSeconds: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusSeconds, resultsIn }) => {
    it(`${plusSeconds} to ${date} results in ${resultsIn}`, () => assertThat(
      addSeconds(plusSeconds, date), equalTo(resultsIn)));
  });
});

describe('addMinutes', () => {
  [
    { date: '2001-01-01T01:00:00', plusMinutes: -1, resultsIn: '2001-01-01T00:59:00' },
    { date: '2001-01-01T00:00:00', plusMinutes: 0.5, resultsIn: '2001-01-01T00:00:30' },
    { date: '2001-01-01T00:00:00', plusMinutes: 1, resultsIn: '2001-01-01T00:01:00' },
    { date: '2001-01-01T00:59:00', plusMinutes: 1, resultsIn: '2001-01-01T01:00:00' },
    { date: 'I\'m invalid', plusMinutes: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusMinutes, resultsIn }) => {
    it(`${plusMinutes} to ${date} results in ${resultsIn}`, () => assertThat(
      addMinutes(plusMinutes, date), equalTo(resultsIn)));
  });
});

describe('addHours', () => {
  [
    { date: '2000-01-01T00:00:00', plusHours: 1, resultsIn: '2000-01-01T01:00:00' },
    { date: '2000-01-01T01:00:00', plusHours: -1, resultsIn: '2000-01-01T00:00:00' },
    { date: 'I\'m invalid', plusHours: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusHours, resultsIn }) => {
    it(`${plusHours} to ${date} results in ${resultsIn}`, () => assertThat(
      addHours(plusHours, date), equalTo(resultsIn)));
  });
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
    { date: 'I\'m invalid', plusDays: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusDays, resultsIn }) => {
    it(`${plusDays} to ${date} results in ${resultsIn}`, () => assertThat(
      addDays(plusDays, date), equalTo(resultsIn)));
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
    { date: 'I\'m invalid', plusMonths: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusMonths, resultsIn }) => {
    it(`${plusMonths} to ${date} results in ${resultsIn}`, () => assertThat(
      addMonths(plusMonths, date), equalTo(resultsIn)));
  });
});

describe('addYears', () => {
  [
    { date: '2000-01-01', plusYears: 1, resultsIn: '2001-01-01' },
    { date: '2001-01-01', plusYears: -1, resultsIn: '2000-01-01' },
    { date: '2000-01-01', plusYears: 10, resultsIn: '2010-01-01' },
    { date: 'I\'m invalid', plusYears: 60, resultsIn: INVALID_DATETIME },
  ].forEach(({ date, plusYears, resultsIn }) => {
    it(`${plusYears} to ${date} results in ${resultsIn}`, () => assertThat(
      addYears(plusYears, date), equalTo(resultsIn)));
  });
});
