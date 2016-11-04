import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATE } from '../constants';
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

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfSecond('I\'m invalid'), equalTo(INVALID_DATE)));
});

describe('startOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:00', () => assertThat(
    startOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:00')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfMinute('I\'m invalid'), equalTo(INVALID_DATE)));
});

describe('startOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:00:00', () => assertThat(
    startOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:00:00')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfHour('I\'m invalid'), equalTo(INVALID_DATE)));
});

describe('startOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfDay('I\'m invalid'), equalTo(INVALID_DATE)));
});

describe('startOfWeek', () => {
  it('2000-01-01T10:11:12.12 results in 1999-12-27T00:00:00', () => assertThat(
    startOfWeek('2000-01-01T10:11:12.12'), equalTo('1999-12-27T00:00:00')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfWeek('I\'m invalid'), equalTo(INVALID_DATE)));
});

describe('startOfMonth', () => {
  it('2000-01-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfMonth('2000-01-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfMonth('I\'m invalid'), equalTo(INVALID_DATE)));
});

describe('startOfYear', () => {
  it('2000-02-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfYear('2000-02-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    startOfYear('I\'m invalid'), equalTo(INVALID_DATE)));
});
