import { assertThat, equalTo } from 'hamjest';
import { getWeekdayOf } from './index';
import {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
} from './constants';

describe('getWeekdayOf', () => {
  it('2001-01-01 is a Monday', () => assertThat(
    getWeekdayOf('2001-01-01'), equalTo(MONDAY)));

  it('2001-01-02 is a Tuesday', () => assertThat(
    getWeekdayOf('2001-01-02'), equalTo(TUESDAY)));

  it('2001-01-03 is a Wednesday', () => assertThat(
    getWeekdayOf('2001-01-03'), equalTo(WEDNESDAY)));

  it('2001-01-04 is a Thursday', () => assertThat(
    getWeekdayOf('2001-01-04'), equalTo(THURSDAY)));

  it('2001-01-05 is a Friday', () => assertThat(
    getWeekdayOf('2001-01-05'), equalTo(FRIDAY)));

  it('2001-01-06 is a Saturday', () => assertThat(
    getWeekdayOf('2001-01-06'), equalTo(SATURDAY)));

  it('2001-01-07 is a Sunday', () => assertThat(
    getWeekdayOf('2001-01-07'), equalTo(SUNDAY)));

  it('1989-01-01 is a Sunday', () => assertThat(
    getWeekdayOf('1989-01-01'), equalTo(SUNDAY)));

  it('2000-12-31 is a Sunday', () => assertThat(
    getWeekdayOf('2000-12-31'), equalTo(SUNDAY)));

  it('2001-01-08 is a Monday', () => assertThat(
    getWeekdayOf('2001-01-08'), equalTo(MONDAY)));

  it('3000-01-01 is a Wednesday', () => assertThat(
    getWeekdayOf('3000-01-01'), equalTo(WEDNESDAY)));

  it('20000-01-01 is a Saturday', () => assertThat(
    getWeekdayOf('20000-01-01'), equalTo(SATURDAY)));
});
