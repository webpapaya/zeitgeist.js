import { assertThat, equalTo } from 'hamjest';
import {
  getWeekday,
  getWeekOfYear,
  getDayOfYear,

  getYear,
  getMonth,
  getDay,
  getHour,
  getMinute,
  getSecond,

  containsTimezone,
  getTimezoneOffset,
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

describe('getYear', () => {
  it('2000-01-02T03:04:05.6 responds 2000', () => assertThat(
    getYear('2000-01-02T03:04:05.6'), equalTo(2000)));
});

describe('getMonth', () => {
  it('2000-01-02T03:04:05.6 responds 1', () => assertThat(
    getMonth('2000-01-02T03:04:05.6'), equalTo(1)));
});

describe('getDay', () => {
  it('2000-01-02T03:04:05.6 responds 2', () => assertThat(
    getDay('2000-01-02T03:04:05.6'), equalTo(2)));
});

describe('getHour', () => {
  it('2000-01-02T03:04:05.6 responds 3', () => assertThat(
    getHour('2000-01-02T03:04:05.6'), equalTo(3)));
});

describe('getMinute', () => {
  it('2000-01-02T03:04:05.6 responds 4', () => assertThat(
    getMinute('2000-01-02T03:04:05.6'), equalTo(4)));
});

describe('getSecond', () => {
  it('2000-01-02T03:04:05.6 responds 4', () => assertThat(
    getSecond('2000-01-02T03:04:05.6'), equalTo(5.6)));
});

describe('containsTimezone', () => {
  it('2000-01-02T03:04:05.6 responds false', () => assertThat(
    containsTimezone('2000-01-02T03:04:05.6'), equalTo(false)));

  it('2000-01-02T03:04:05+10:00 responds true', () => assertThat(
    containsTimezone('2000-01-02T03:04:05+10:00'), equalTo(true)));

  it('2000-01-02T03:04:05Z responds true', () => assertThat(
    containsTimezone('2000-01-02T03:04:05Z'), equalTo(true)));
});

describe('getTimezoneOffset', () => {
  it('2000-01-02T03:04:05.6 responds null', () => assertThat(
    getTimezoneOffset('2000-01-02T03:04:05.6'), equalTo(null)));

  it('2000-01-02T03:04:05Z responds Z', () => assertThat(
    getTimezoneOffset('2000-01-02T03:04:05Z'), equalTo('Z')));

  it('2000-01-02T03:04:05+00:10 responds +00:10', () => assertThat(
    getTimezoneOffset('2000-01-02T03:04:05+00:10'), equalTo('+00:10')));

  it('2000-01-02T03:04:05-00:10 responds -00:10', () => assertThat(
    getTimezoneOffset('2000-01-02T03:04:05-00:10'), equalTo('-00:10')));
});
