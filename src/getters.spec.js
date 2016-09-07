import { daysBetween } from './index';

const WEEKDAY_REFERENCE_DATE = '2001-01-01';
const DAYS_IN_ONE_WEEK = 7;

const fixNegativeDaysBetween = (days) =>  days >= 0 ? days : DAYS_IN_ONE_WEEK + days;
const getWeekdayOf = (isoString) => {
  const days = daysBetween(WEEKDAY_REFERENCE_DATE, isoString);
  return fixNegativeDaysBetween(days % DAYS_IN_ONE_WEEK) + 1;
};

import { assertThat, equalTo } from 'hamjest';
describe('getWeekdayOf', () => {
  it('1989-01-01 is 7', () => assertThat(
    getWeekdayOf('1989-01-01'), equalTo(7)));

  it('2000-12-31 is 7', () => assertThat(
    getWeekdayOf('2000-12-31'), equalTo(7)));

  it('2001-01-01 is 1', () => assertThat(
    getWeekdayOf('2001-01-01'), equalTo(1)));

  it('2001-01-02 is 2', () => assertThat(
    getWeekdayOf('2001-01-02'), equalTo(2)));

  it('2001-01-08 is 1', () => assertThat(
    getWeekdayOf('2001-01-08'), equalTo(1)));

  it('3000-01-01 is 3', () => assertThat(
    getWeekdayOf('3000-01-01'), equalTo(3)));

  it('20000-01-01 is 6', () => assertThat(
    getWeekdayOf('20000-01-01'), equalTo(6)));
});
