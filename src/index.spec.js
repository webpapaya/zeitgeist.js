import { assertThat, equalTo } from 'hamjest';
import { daysInMonth, isLeapYear } from './index';

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

describe('daysInMonth', () => {
  describe('in a leap year', () => {
    it('january has 31 days', () => assertThat(
      daysInMonth('2016', 1), equalTo(31)));

    it('february has 29 days', () => assertThat(
      daysInMonth('2016', 2), equalTo(29)));

    it('march has 31 days', () => assertThat(
      daysInMonth('2016', 3), equalTo(31)));

    it('april has 30 days', () => assertThat(
      daysInMonth('2016', 4), equalTo(30)));

    it('may has 31 days', () => assertThat(
      daysInMonth('2016', 5), equalTo(31)));

    it('june has 30 days', () => assertThat(
      daysInMonth('2016', 6), equalTo(30)));

    it('july has 30 days', () => assertThat(
      daysInMonth('2016', 7), equalTo(30)));

    it('august has 31 days', () => assertThat(
      daysInMonth('2016', 8), equalTo(31)));

    it('september has 30 days', () => assertThat(
      daysInMonth('2016', 9), equalTo(30)));

    it('october has 31 days', () => assertThat(
      daysInMonth('2016', 10), equalTo(31)));

    it('november has 30 days', () => assertThat(
      daysInMonth('2016', 11), equalTo(30)));

    it('december has 31 days', () => assertThat(
      daysInMonth('2016', 12), equalTo(31)));
  });

  describe('in a regular year', () => {
    it('january has 31 days', () => assertThat(
      daysInMonth('2017', 1), equalTo(31)));

    it('february has 28 days', () => assertThat(
      daysInMonth('2017', 2), equalTo(28)));

    it('march has 31 days', () => assertThat(
      daysInMonth('2017', 3), equalTo(31)));

    it('april has 30 days', () => assertThat(
      daysInMonth('2017', 4), equalTo(30)));

    it('may has 31 days', () => assertThat(
      daysInMonth('2017', 5), equalTo(31)));

    it('june has 30 days', () => assertThat(
      daysInMonth('2017', 6), equalTo(30)));

    it('july has 30 days', () => assertThat(
      daysInMonth('2017', 7), equalTo(30)));

    it('august has 31 days', () => assertThat(
      daysInMonth('2017', 8), equalTo(31)));

    it('september has 30 days', () => assertThat(
      daysInMonth('2017', 9), equalTo(30)));

    it('october has 31 days', () => assertThat(
      daysInMonth('2017', 10), equalTo(31)));

    it('november has 30 days', () => assertThat(
      daysInMonth('2017', 11), equalTo(30)));

    it('december has 31 days', () => assertThat(
      daysInMonth('2017', 12), equalTo(31)));
  });
});
