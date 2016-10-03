import { assertThat, equalTo } from 'hamjest';
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
});

describe('startOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:00', () => assertThat(
    startOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:00')));
});

describe('startOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:00:00', () => assertThat(
    startOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:00:00')));
});

describe('startOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T00:00:00')));
});

describe('startOfWeek', () => {
  it('2000-01-01T10:11:12.12 results in 1999-12-27T00:00:00', () => assertThat(
    startOfWeek('2000-01-01T10:11:12.12'), equalTo('1999-12-27T00:00:00')));
});

describe('startOfMonth', () => {
  it('2000-01-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfMonth('2000-01-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));
});

describe('startOfYear', () => {
  it('2000-02-02T10:11:12.12 results in 2000-01-01T00:00:00', () => assertThat(
    startOfYear('2000-02-02T10:11:12.12'), equalTo('2000-01-01T00:00:00')));
});
