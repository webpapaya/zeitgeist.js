import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from '../constants';
import {
  startOfSecond,
  startOfMinute,
  startOfHour,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from './start-of';

describe('startOfSecond', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:12', () => assertThat(
    startOfSecond('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:12')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:12+10:00', () => assertThat(
    startOfSecond('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:12+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfSecond('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('startOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:00', () => assertThat(
    startOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:00')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:11:00+10:00', () => assertThat(
    startOfMinute('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:11:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfMinute('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('startOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:00:00', () => assertThat(
    startOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:00:00')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T10:00:00+10:00', () => assertThat(
    startOfHour('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T10:00:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfHour('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('startOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('2000-01-01T10:11:12.12+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    startOfDay('2000-01-01T10:11:12.12+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfDay('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('startOfWeek', () => {
  it('2000-01-01T10:11:12.12 results in 1999-12-27T00:00:00', () => assertThat(
    startOfWeek('2000-01-01T10:11:12.12'), equalTo('1999-12-27T00:00:00')));

  it('2000-01-01T10:11:12.12+10:00 results in 1999-12-27T00:00:00+10:00', () => assertThat(
    startOfWeek('2000-01-01T10:11:12.12+10:00'), equalTo('1999-12-27T00:00:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfWeek('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('startOfMonth', () => {
  it('2000-01-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfMonth('2000-01-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('2000-01-02T10:11:12.12+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    startOfMonth('2000-01-02T10:11:12.12+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfMonth('I\'m invalid'), equalTo(INVALID_DATETIME)));
});

describe('startOfYear', () => {
  it('2000-02-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfYear('2000-02-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('2000-02-02T10:11:12.12+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
    startOfYear('2000-02-02T10:11:12.12+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

  it('`I\'m invalid`results in `INVALID_DATETIME`', () => assertThat(
    startOfYear('I\'m invalid'), equalTo(INVALID_DATETIME)));
});
