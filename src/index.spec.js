import { assertThat, equalTo } from 'hamjest';
import {
  daysInMonth,
  daysInYear,
  isLeapYear,
  isFirstDayOfMonth,
  isLastDayOfMonth
} from './index';

describe('isLastDayOfMonth', () => {
  it('2000-01-31 is last of month', () => assertThat(
    isLastDayOfMonth('2000-01-31'), equalTo(true)));

  it('2000-01-01 is NOT last of month', () => assertThat(
    isLastDayOfMonth('2000-01-01'), equalTo(false)));
});

describe('isFirstDayOfMonth', () => {
  it('2000-01-31 is last of month', () => assertThat(
    isFirstDayOfMonth('2000-01-31'), equalTo(false)));

  it('2000-01-01 is NOT last of month', () => assertThat(
    isFirstDayOfMonth('2000-01-01'), equalTo(true)));
});


describe('isLeapYear', () => {
  const LEAP_YEARS = '2000 2016'.split(' ');
  const REGULAR_YEARS = '1582 1700 1800 2017'.split(' ');

  LEAP_YEARS.forEach((year) => {
    it(`${year} is a leap year`, () => assertThat(
      isLeapYear(year), equalTo(true)));
  });

  REGULAR_YEARS.forEach((year) => {
    it(`${year} is NOT a leap year`, () => assertThat(
      isLeapYear(year), equalTo(false)));
  });
});

describe('daysInYear', () => {
  it('a leap year contains 366 days', () => assertThat(
    daysInYear('2016-01'), equalTo(366)));

  it('a regular year contains 365 days', () => assertThat(
    daysInYear('2015-01'), equalTo(365)));
});

describe('daysInMonth', () => {
  describe('in a leap year', () => {
    it('january has 31 days', () => assertThat(
      daysInMonth('2016-01'), equalTo(31)));

    it('february has 29 days', () => assertThat(
      daysInMonth('2016-02'), equalTo(29)));

    it('march has 31 days', () => assertThat(
      daysInMonth('2016-03'), equalTo(31)));

    it('april has 30 days', () => assertThat(
      daysInMonth('2016-04'), equalTo(30)));

    it('may has 31 days', () => assertThat(
      daysInMonth('2016-05'), equalTo(31)));

    it('june has 30 days', () => assertThat(
      daysInMonth('2016-06'), equalTo(30)));

    it('july has 30 days', () => assertThat(
      daysInMonth('2016-07'), equalTo(30)));

    it('august has 31 days', () => assertThat(
      daysInMonth('2016-08'), equalTo(31)));

    it('september has 30 days', () => assertThat(
      daysInMonth('2016-06'), equalTo(30)));

    it('october has 31 days', () => assertThat(
      daysInMonth('2016-10'), equalTo(31)));

    it('november has 30 days', () => assertThat(
      daysInMonth('2016-11'), equalTo(30)));

    it('december has 31 days', () => assertThat(
      daysInMonth('2016-12'), equalTo(31)));
  });

  describe('in a regular year', () => {
    it('january has 31 days', () => assertThat(
      daysInMonth('2015-01'), equalTo(31)));

    it('february has 28 days', () => assertThat(
      daysInMonth('2015-02'), equalTo(28)));

    it('march has 31 days', () => assertThat(
      daysInMonth('2015-03'), equalTo(31)));

    it('april has 30 days', () => assertThat(
      daysInMonth('2015-04'), equalTo(30)));

    it('may has 31 days', () => assertThat(
      daysInMonth('2015-05'), equalTo(31)));

    it('june has 30 days', () => assertThat(
      daysInMonth('2015-06'), equalTo(30)));

    it('july has 30 days', () => assertThat(
      daysInMonth('2015-07'), equalTo(30)));

    it('august has 31 days', () => assertThat(
      daysInMonth('2015-08'), equalTo(31)));

    it('september has 30 days', () => assertThat(
      daysInMonth('2015-06'), equalTo(30)));

    it('october has 31 days', () => assertThat(
      daysInMonth('2015-10'), equalTo(31)));

    it('november has 30 days', () => assertThat(
      daysInMonth('2015-11'), equalTo(30)));

    it('december has 31 days', () => assertThat(
      daysInMonth('2015-12'), equalTo(31)));
  });
});
