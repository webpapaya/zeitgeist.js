import { assertThat, equalTo } from 'hamjest';
import {
  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfMonth,
  endOfYear,
} from './end-of';

describe('endOfSecond', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:12.999999', () => assertThat(
    endOfSecond('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:12.999999')));
});

describe('endOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:59.999999', () => assertThat(
    endOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:59.999999')));
});

describe('endOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:59:59.999999', () => assertThat(
    endOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:59:59.999999')));
});

describe('endOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T23:59:59.999999', () => assertThat(
    endOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T23:59:59.999999')));
});

describe('endOfMonth', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-31T23:59:59.999999', () => assertThat(
    endOfMonth('2000-01-01T10:11:12.12'), equalTo('2000-01-31T23:59:59.999999')));
});

describe('endOfYear', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-31T23:59:59.999999', () => assertThat(
    endOfYear('2000-01-01T10:11:12.12'), equalTo('2000-12-31T23:59:59.999999')));
});


