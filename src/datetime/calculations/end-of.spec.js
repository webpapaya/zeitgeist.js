import { assertThat, equalTo } from 'hamjest';
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
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:12.999999', () => assertThat(
    endOfSecond('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:12.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfSecond('I\'m invalid'), equalTo('Invalid Date')));
});

describe('endOfMinute', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:11:59.999999', () => assertThat(
    endOfMinute('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:11:59.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfMinute('I\'m invalid'), equalTo('Invalid Date')));
});

describe('endOfHour', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T10:59:59.999999', () => assertThat(
    endOfHour('2000-01-01T10:11:12.12'), equalTo('2000-01-01T10:59:59.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfHour('I\'m invalid'), equalTo('Invalid Date')));
});

describe('endOfDay', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-01T23:59:59.999999', () => assertThat(
    endOfDay('2000-01-01T10:11:12.12'), equalTo('2000-01-01T23:59:59.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfDay('I\'m invalid'), equalTo('Invalid Date')));
});

describe('endOfWeek', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-02T23:59:59.999999', () => assertThat(
    endOfWeek('2000-01-01T10:11:12.12'), equalTo('2000-01-02T23:59:59.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfWeek('I\'m invalid'), equalTo('Invalid Date')));
});


describe('endOfMonth', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-31T23:59:59.999999', () => assertThat(
    endOfMonth('2000-01-01T10:11:12.12'), equalTo('2000-01-31T23:59:59.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfMonth('I\'m invalid'), equalTo('Invalid Date')));
});

describe('endOfYear', () => {
  it('2000-01-01T10:11:12.12 results in 2000-01-31T23:59:59.999999', () => assertThat(
    endOfYear('2000-01-01T10:11:12.12'), equalTo('2000-12-31T23:59:59.999999')));

  it('`I\'m invalid`results in Invalid Date', () => assertThat(
    endOfYear('I\'m invalid'), equalTo('Invalid Date')));
});
