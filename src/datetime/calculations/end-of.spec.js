import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from '../constants';
import {
  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
} from '../index';

describe('endOfSecond', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:12.99', () => assertThat(
    endOfSecond('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:12.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:12.999999+10:00', () => assertThat(
    endOfSecond('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:12.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfSecond('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('endOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:59.99', () => assertThat(
    endOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:59.99+10:00', () => assertThat(
    endOfMinute('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfMinute('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('endOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:59:59.99', () => assertThat(
    endOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:59:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:59:59.99+10:00', () => assertThat(
    endOfHour('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:59:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfHour('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('endOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T23:59:59.99', () => assertThat(
    endOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T23:59:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T23:59:59.99+10:00', () => assertThat(
    endOfDay('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T23:59:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfDay('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('endOfWeek', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-02T23:59:59.99', () => assertThat(
    endOfWeek('2000-01-01T10:11:12.12'), equalTo('2000-01-02T23:59:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-02T23:59:59.99+10:00', () => assertThat(
    endOfWeek('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-02T23:59:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfWeek('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('endOfMonth', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-31T23:59:59.99', () => assertThat(
    endOfMonth('2000-01-01T10:11:12.12'), equalTo('2000-01-31T23:59:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-31T23:59:59.99+10:00', () => assertThat(
    endOfMonth('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-31T23:59:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfMonth('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('endOfYear', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-31T23:59:59.99', () => assertThat(
    endOfYear('2000-01-01T10:11:12.12'), equalTo('2000-12-31T23:59:59.99')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-12-31T23:59:59.99+10:00', () => assertThat(
    endOfYear('2000-01-01T10:11:12.12+10:00'), equalTo('2000-12-31T23:59:59.99+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    endOfYear('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
