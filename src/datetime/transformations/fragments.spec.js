import { assertThat, equalTo } from 'hamjest';
import { toFragments } from '../index';
import {
  extractTime,
  extractDate,
  extractTimezoneAsTime,
} from './fragments';

describe('extractTimezoneAsTime', () => {
  [
    { isoDatetime: '2000', timezone: 'PT0H' },
    { isoDatetime: '2000-01', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01T10', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10:10', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10:10:-01', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10:10:10Z', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10:10:10Z ', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10:10:10+01:00', timezone: 'PT1H' },
    { isoDatetime: '2000-01-01T10:10:10-01:00', timezone: 'PT-1H' },
    { isoDatetime: '2000-01-01 10:10:10+00:00', timezone: 'PT0H' },
    { isoDatetime: '2000-01-01 10:10:10+10:10', timezone: 'PT10H10M' },
  ].forEach(({ isoDatetime, timezone }) => {
    it(`${isoDatetime} responds ${timezone}`, () => assertThat(
      extractTimezoneAsTime(isoDatetime), equalTo(timezone)));
  });
});

describe('extractDate', () => {
  [
    { isoDatetime: '', date: '' },
    { isoDatetime: '10', date: '10' },
    { isoDatetime: '2000', date: '2000' },
    { isoDatetime: '999999', date: '999999' },
    { isoDatetime: '2000-01', date: '2000-01' },
    { isoDatetime: '2000-01-01', date: '2000-01-01' },
    { isoDatetime: '2000-01-01T10', date: '2000-01-01' },
    { isoDatetime: '2000-01-01 10', date: '2000-01-01' },
    { isoDatetime: '-2000--01--01', date: '-2000--01--01' },
    { isoDatetime: '2000-01-01 10:10', date: '2000-01-01' },
    { isoDatetime: '2000-01-01T10:10:10', date: '2000-01-01' },
    { isoDatetime: '2000-01-01 10:10:10Z', date: '2000-01-01' },
    { isoDatetime: '2000-01-01 10:10:10+01:00', date: '2000-01-01' },
  ].forEach(({ isoDatetime, date }) => {
    it(`${isoDatetime} responds ${date}`, () => assertThat(
      extractDate(isoDatetime), equalTo(date)));
  });
});

describe('extractTime', () => {
  [
    { isoDatetime: 'T20:15', time: '20:15' },
    { isoDatetime: '2000', time: '' },
    { isoDatetime: '2000-01', time: '' },
    { isoDatetime: '2000-01-01', time: '' },
    { isoDatetime: '2000-01-01T10', time: '10' },
    { isoDatetime: '2000-01-01 10', time: '10' },
    { isoDatetime: '2000-01-01 10:10', time: '10:10' },
    { isoDatetime: '2000-01-01 10:10:10', time: '10:10:10' },
    { isoDatetime: '2000-01-01 10:10:10Z', time: '10:10:10' },
    { isoDatetime: '2000-01-01 10:10:10+01:00', time: '10:10:10' },
    { isoDatetime: '2000-01-01 10:10:10-01:00', time: '10:10:10' },
  ].forEach(({ isoDatetime, time }) => {
    it(`${isoDatetime} responds ${time}`, () => assertThat(
      extractTime(isoDatetime), equalTo(time)));
  });
});

describe('toFragments', () => {
  describe('`2000` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000').year, equalTo(2000)));

    it('month undefined', () => assertThat(
      toFragments('2000').month, equalTo(void 0)));

    it('day undefined', () => assertThat(
      toFragments('2000').day, equalTo(void 0)));

    it('hour undefined', () => assertThat(
      toFragments('2000').hour, equalTo(void 0)));

    it('minute undefined', () => assertThat(
      toFragments('2000').minute, equalTo(void 0)));

    it('second undefined', () => assertThat(
      toFragments('2000').second, equalTo(void 0)));
  });

  describe('`2000-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01').month, equalTo(1)));

    it('day undefined', () => assertThat(
      toFragments('2000-01').day, equalTo(void 0)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      toFragments('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      toFragments('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01T10:20:30.123Z` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123Z').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123Z').minute, equalTo(20)));

    it('`second is 30.123`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123Z').second, equalTo(30.123)));
  });

  describe('`2000-01-01T10:20:30.123+01:15` responds', () => {
    it('`timezoneOffset` is PT1H15M', () => assertThat(
      toFragments('2000-01-01T10:20:30.123+01:15').timezoneOffset, equalTo('PT1H15M')));
  });

  describe('`2000-01-01T10:20:30.123-01:15` responds', () => {
    it('`timezoneOffset` is PT-1H-15M', () => assertThat(
      toFragments('2000-01-01T10:20:30.123-01:15').timezoneOffset, equalTo('PT-1H-15M')));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is undefined`', () => assertThat(
      toFragments('2000-01-01 10:20').second, equalTo(void 0)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is undefined`', () => assertThat(
      toFragments('2000-01-01 10:20').second, equalTo(void 0)));
  });

  describe('`T20:15` responds', () => {
    it('`hour` is 20', () => assertThat(
      toFragments('T20:15').hour, equalTo(20)));

    it('`minute` is 15', () => assertThat(
      toFragments('T20:15').minute, equalTo(15)));

    it('`second` is undefined', () => assertThat(
      toFragments('T20:15').second, equalTo(void 0)));
  });
});
