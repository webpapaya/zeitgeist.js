import { assertThat, equalTo } from 'hamjest';
import {
  getWeekday,
  getWeekOfYear,
  getDayOfYear,
} from './index';

import {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
} from './constants';

describe('getWeekday', () => {
  it('2001-01-01 is a Monday', () => assertThat(
    getWeekday('2001-01-01'), equalTo(MONDAY)));

  it('2001-01-02 is a Tuesday', () => assertThat(
    getWeekday('2001-01-02'), equalTo(TUESDAY)));

  it('2001-01-03 is a Wednesday', () => assertThat(
    getWeekday('2001-01-03'), equalTo(WEDNESDAY)));

  it('2001-01-04 is a Thursday', () => assertThat(
    getWeekday('2001-01-04'), equalTo(THURSDAY)));

  it('2001-01-05 is a Friday', () => assertThat(
    getWeekday('2001-01-05'), equalTo(FRIDAY)));

  it('2001-01-06 is a Saturday', () => assertThat(
    getWeekday('2001-01-06'), equalTo(SATURDAY)));

  it('2001-01-07 is a Sunday', () => assertThat(
    getWeekday('2001-01-07'), equalTo(SUNDAY)));

  it('1989-01-01 is a Sunday', () => assertThat(
    getWeekday('1989-01-01'), equalTo(SUNDAY)));

  it('2000-12-31 is a Sunday', () => assertThat(
    getWeekday('2000-12-31'), equalTo(SUNDAY)));

  it('2001-01-08 is a Monday', () => assertThat(
    getWeekday('2001-01-08'), equalTo(MONDAY)));

  it('3000-01-01 is a Wednesday', () => assertThat(
    getWeekday('3000-01-01'), equalTo(WEDNESDAY)));

  it('20000-01-01 is a Saturday', () => assertThat(
    getWeekday('20000-01-01'), equalTo(SATURDAY)));
});

describe('getDayOfYear', () => {
  it('2000-01-01 responds 1', () => assertThat(
    getDayOfYear('2000-01-01'), equalTo(1)));

  it('2000-01-02 responds 2', () => assertThat(
    getDayOfYear('2000-01-02'), equalTo(2)));

  it('2000-12-31 (leap year) responds 366', () => assertThat(
    getDayOfYear('2000-12-31'), equalTo(366)));

  it('2001-12-31 (regular year) responds 365', () => assertThat(
    getDayOfYear('2001-12-31'), equalTo(365)));
});

describe('getWeekOfYear', () => {
  it('2000-01-01 responds 53', () => assertThat(
    getWeekOfYear('2000-01-01'), equalTo(53)));

  it('2008-09-26 responds 39', () => assertThat(
    getWeekOfYear('2008-09-26'), equalTo(39)));

  it('2001-01-01 responds 1', () => assertThat(
    getWeekOfYear('2001-01-01'), equalTo(1)));

  it('2001-01-07 responds 1', () => assertThat(
    getWeekOfYear('2001-01-07'), equalTo(1)));

  it('2001-12-31 responds 53', () => assertThat(
    getWeekOfYear('2001-12-31'), equalTo(53)));
});