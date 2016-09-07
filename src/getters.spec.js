
import { daysBetween } from './index';

const WEEKDAY_REFERENCE_DATE = '2001-01-01';
const getWeekdayOf = (isoString) =>
  (daysBetween(WEEKDAY_REFERENCE_DATE, isoString) + 1) % 7;

import { assertThat, equalTo } from 'hamjest';
describe('getWeekdayOf', () => {
  xit('2000-12-31 is 1', () => assertThat(
    getWeekdayOf('2000-12-31'), equalTo(7)));

  it('2001-01-01 is 1', () => assertThat(
    getWeekdayOf('2001-01-01'), equalTo(1)));

  it('2001-01-02 is 2', () => assertThat(
    getWeekdayOf('2001-01-02'), equalTo(2)));

  it('2001-01-08 is 1', () => assertThat(
    getWeekdayOf('2001-01-08'), equalTo(1)));

  it('3000-01-01 is 3', () => assertThat(
    getWeekdayOf('3000-01-01'), equalTo(3)));

  it('20000-01-01 is 3', () => assertThat(
    getWeekdayOf('20000-01-01'), equalTo(1)));

  // it('1999-01-01 is 4', () => assertThat(
  //   getWeekdayOf('1999-01-01'), equalTo(4)));
});

