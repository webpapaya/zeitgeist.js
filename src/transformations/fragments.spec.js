import { assertThat, equalTo } from 'hamjest';
import { toFragments } from '../index';
import {
  extractTime,
  extractDate,
  // getTimezoneAsTime
} from './fragments';

import {
  buildMaybeMonad
} from '../utils';


const getTimezoneAsTime = (isoString) => {
  const timezone = buildMaybeMonad(isoString)
    .map((value) => value.replace(/-?\d+(--?\d{2})?(--?\d{2})?/, ''))
    .map((value) => value.replace(/Z$/, ' +00:00'))
    .map((value) => value.match(/[\d\sT][+-]\d{2}(:\d{2})?$/))
    .map((value) => value[0].slice(1))
    .toValue();

  return timezone || '';
};

describe.only('getTimezoneAsTime', () => {
  [
    { isoString: '2000', timezone: '' },
    { isoString: '2000-01', timezone: '' },
    { isoString: '2000-01-01', timezone: '' },
    { isoString: '2000-01-01T10', timezone: '' },
    { isoString: '2000-01-01 10', timezone: '' },
    { isoString: '2000-01-01 10:10', timezone: '' },
    { isoString: '2000-01-01 10:10:-01', timezone: '' },
    { isoString: '2000-01-01 10:10:10Z', timezone: '+00:00' },
    { isoString: '2000-01-01 10:10:10+01:00', timezone: '+01:00' },
    { isoString: '2000-01-01T10:10:10-01:00', timezone: '-01:00' },
    { isoString: '2000-01-01 10:10:10+00:00', timezone: '+00:00' },
  ].forEach(({ isoString, timezone }) => {
    it(`${isoString} responds ${timezone}`, () => assertThat(
      getTimezoneAsTime(isoString), equalTo(timezone)));
  });
});

describe('extractDate', () => {
  [
    { isoString: '10', date: '10' },
    { isoString: '2000', date: '2000' },
    { isoString: '999999', date: '999999' },
    { isoString: '2000-01', date: '2000-01' },
    { isoString: '2000-01-01', date: '2000-01-01' },
    { isoString: '2000-01-01T10', date: '2000-01-01' },
    { isoString: '2000-01-01 10', date: '2000-01-01' },
    { isoString: '-2000--01--01', date: '-2000--01--01' },
    { isoString: '2000-01-01 10:10', date: '2000-01-01' },
    { isoString: '2000-01-01T10:10:10', date: '2000-01-01' },
    { isoString: '2000-01-01 10:10:10Z', date: '2000-01-01' },
    { isoString: '2000-01-01 10:10:10+01:00', date: '2000-01-01' },
  ].forEach(({ isoString, date }) => {
    it(`${isoString} responds ${date}`, () => assertThat(
      extractDate(isoString), equalTo(date)));
  });
});

describe('extractTime', () => {
  [
    { isoString: '2000', time: '' },
    { isoString: '2000-01', time: '' },
    { isoString: '2000-01-01', time: '' },
    { isoString: '2000-01-01T10', time: '10' },
    { isoString: '2000-01-01 10', time: '10' },
    { isoString: '2000-01-01 10:10', time: '10:10' },
    { isoString: '2000-01-01 10:10:10', time: '10:10:10' },
    { isoString: '2000-01-01 10:10:10Z', time: '10:10:10' },
    { isoString: '2000-01-01 10:10:10+01:00', time: '10:10:10' },
    { isoString: '2000-01-01 10:10:10-01:00', time: '10:10:10' },
  ].forEach(({ isoString, time }) => {
    it(`${isoString} responds ${time}`, () => assertThat(
      extractTime(isoString), equalTo(time)));
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

    it.skip('`timezoneOffset is 0`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123Z').timezoneOffset, equalTo(0)));
  });

  describe.skip('`2000-01-01T10:20:30.123+01:00` responds', () => {
    it('`timezoneOffset is 1`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123+01:00').timezoneOffset, equalTo(1)));
  });

  describe.skip('`2000-01-01T10:20:30.123-01:00` responds', () => {
    it('`timezoneOffset is -1`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123-01:00').timezoneOffset, equalTo(-1)));
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
