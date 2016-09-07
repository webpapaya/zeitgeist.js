
import { daysBetween } from './index';

const WEEKDAY_REFERENCE_DATE = '2001-01-01';
const getWeekdayOf = (isoString) =>
  (daysBetween(WEEKDAY_REFERENCE_DATE, isoString) + 1) % 7;

import { assertThat, equalTo } from 'hamjest';
describe('getWeekdayOf', () => {
  it('2001-01-01 is 1', () => assertThat(
    getWeekdayOf('2001-01-01'), equalTo(1)));

  it('2001-01-02 is 2', () => assertThat(
    getWeekdayOf('2001-01-02'), equalTo(2)));

  it('2001-01-08 is 1', () => assertThat(
    getWeekdayOf('2001-01-08'), equalTo(1)));

  xit('3000-01-01 is 3', () => assertThat(
    getWeekdayOf('3000-01-01'), equalTo(3)));

  xit('20000-01-01 is 3', () => assertThat(
    getWeekdayOf('20000-01-01'), equalTo(1)));

  it('1999-01-01 is 3', () => assertThat(
    getWeekdayOf('1999-01-01'), equalTo(2)));

  it('19-01-01 is 3', () => assertThat(
    getWeekdayOf('2010-01-01'), equalTo(2)));
});

