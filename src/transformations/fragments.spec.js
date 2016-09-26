import { assertThat, equalTo } from 'hamjest';
import { toFragments } from '../index';
import { getTimezoneAsTime } from './fragments';

describe('getTimezoneAsTime', () => {
  it('2000-01-00 00:00:00+01:00 responds +01:00', () => assertThat(
    getTimezoneAsTime('2000-01-01 00:00:00+01:00'), equalTo('+01:00')));

  it('2000-01-01T00:00:00+01:00 responds +01:00', () => assertThat(
    getTimezoneAsTime('2000-01-01T00:00:00+01:00'), equalTo('+01:00')));

  it('2000-01-01T00:00:00-01:00 responds -01:00', () => assertThat(
    getTimezoneAsTime('2000-01-01T00:00:00-01:00'), equalTo('-01:00')));

  it('2000-01-01T00:00:00Z responds +00:00', () => assertThat(
    getTimezoneAsTime('2000-01-01T00:00:00Z'), equalTo('+00:00')));

  it('2000-01-01T00:00:00 responds +00:00', () => assertThat(
    getTimezoneAsTime('2000-01-01T00:00:00'), equalTo('+00:00')));
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
