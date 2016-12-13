import { assertThat, equalTo } from 'hamjest';
import {
  isBetween,
  isSame,
  isBefore,
  isAfter,
  isSameOrAfter,
  isSameOrBefore,
  isSameYear,
  isSameMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
} from './index';

describe('isSame', () => {
  it('2000-01-01 is NOT the same 2000-01-02', () => assertThat(
    isSame('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-01 is NOT the same 2000-01-01', () => assertThat(
    isSame('2000-01-01', '2000-01-01'), equalTo(true)));

  it('2000-01-01T10:00:00+01:00 is NOT same as 2000-01-01T10:00:00+00:00', () => assertThat(
    isSame('2000-01-01T10:00:00+01:00', '2000-01-01T10:00:00+00:00'), equalTo(false)));

  it('2000-01-01T11:00:00+01:00 is the same as 2000-01-01T10:00:00+00:00', () => assertThat(
    isSame('2000-01-01T11:00:00+01:00', '2000-01-01T10:00:00+00:00'), equalTo(true)));

  it('can be curried', () => assertThat(
    isSame('2000-01-01')('2000-01-01'), equalTo(true)));
});

describe('isBefore', () => {
  it('2000-01-01 is before 2000-01-02', () => assertThat(
    isBefore('2000-01-01', '2000-01-02'), equalTo(true)));

  it('2000-01-02 is NOT before 2000-01-01', () => assertThat(
    isBefore('2000-01-02', '2000-01-01'), equalTo(false)));

  it('T10:00 is before T11:00', () => assertThat(
    isBefore('T10:00', 'T11:00'), equalTo(true)));

  it('can be curried', () => assertThat(
    isBefore('T10:00')('T11:00'), equalTo(true)));
});

describe('isSameOrBefore', () => {
  it('2000-01-01 is before 2000-01-02', () => assertThat(
    isSameOrBefore('2000-01-01', '2000-01-02'), equalTo(true)));

  it('2000-01-01 is equal to 2000-01-01', () => assertThat(
    isSameOrBefore('2000-01-01', '2000-01-01'), equalTo(true)));

  it('can be curried', () => assertThat(
    isSameOrBefore('2000-01-01')('2000-01-01'), equalTo(true)));
});

describe('isAfter', () => {
  it('2000-01-01 is NOT after 2000-01-02', () => assertThat(
    isAfter('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-02 is before 2000-01-01', () => assertThat(
    isAfter('2000-01-02', '2000-01-01'), equalTo(true)));

  it('T10:00 is NOT after T11:00', () => assertThat(
    isAfter('T10:00', 'T11:00'), equalTo(false)));

  it('can be curried', () => assertThat(
    isAfter('T10:00')('T11:00'), equalTo(false)));
});

describe('isSameOrBefore', () => {
  it('2000-01-01 is NOT after 2000-01-02', () => assertThat(
    isSameOrAfter('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-01 is equal to 2000-01-01', () => assertThat(
    isSameOrAfter('2000-01-01', '2000-01-01'), equalTo(true)));

  it('can be curried', () => assertThat(
    isSameOrAfter('2000-01-01')('2000-01-01'), equalTo(true)));
});

describe('isBetween', () => {
  it('2000-01-02 is between 2000-01-01 and 2000-01-03', () => assertThat(
    isBetween({ from: '2000-01-01', to: '2000-01-03' }, '2000-01-02'), equalTo(true)));

  it('2000-01-04 is NOT between 2000-01-01 and 2000-01-03', () => assertThat(
    isBetween({ from: '2000-01-01', to: '2000-01-03' }, '2000-01-04'), equalTo(false)));

  it('T10:00 is between T09:00 and T10:00', () => assertThat(
    isBetween({ from: 'T09:00', to: 'T10:00' }, 'T10:00'), equalTo(true)));

  it('1972-06-30T23:59:60 is between 1972-07-01T00:00:00 and 1972-06-30T23:59:59', () => assertThat(
    isBetween({
      from: '1972-07-01T00:00:00',
      to: '1972-06-30T23:59:59',
    }, '1972-06-30T23:59:60'), equalTo(true)));

  it('can be curried', () => assertThat(
    isBetween({ from: 'T09:00', to: 'T10:00' })('T10:00'), equalTo(true)));
});

describe('isSameYear', () => {
  it('2000-02-03 and 2000-01-03 is same year', () => assertThat(
    isSameYear('2000-02-03', '2000-01-03'), equalTo(true)));

  it('2000-02-03 and 2001-01-03 is NOT same year', () => assertThat(
    isSameYear('2000-02-03', '2001-02-03'), equalTo(false)));

  it('can be curried', () => assertThat(
    isSameYear('2000-02-03')('2001-02-03'), equalTo(false)));
});

describe('isSameMonth', () => {
  it('2000-02-03 and 2000-01-03 is NOT same month', () => assertThat(
    isSameMonth('2000-02-03', '2000-01-03'), equalTo(false)));

  it('2000-02-03 and 2000-02-01 is same month', () => assertThat(
    isSameMonth('2000-02-03', '2000-02-01'), equalTo(true)));

  it('can be curried', () => assertThat(
    isSameMonth('2000-02-03')('2000-02-01'), equalTo(true)));
});

describe('isSameDay', () => {
  it('2000-01-03 and 2000-01-03 is same day', () => assertThat(
    isSameDay('2000-01-03', '2000-01-03'), equalTo(true)));

  it('2000-01-03 and 2000-02-01 is NOT same month', () => assertThat(
    isSameDay('2000-02-03', '2000-02-01'), equalTo(false)));

  it('can be curried', () => assertThat(
    isSameDay('2000-02-03')('2000-02-01'), equalTo(false)));
});

describe('isSameHour', () => {
  it('2000-01-03T01:02:03 and 2000-01-03T01:03:04 is same hour', () => assertThat(
    isSameHour('2000-01-03T01:02:03', '2000-01-03T01:03:04'), equalTo(true)));

  it('2000-01-03T01:03:04 and 2000-01-03T02:03:04 is NOT same hour', () => assertThat(
    isSameHour('2000-01-03T01:03:04', '2000-01-03T02:03:04'), equalTo(false)));

  it('can be curried', () => assertThat(
    isSameHour('2000-01-03T01:03:04')('2000-01-03T02:03:04'), equalTo(false)));
});

describe('isSameMinute', () => {
  it('2000-01-03T01:02:03 and 2000-01-03T01:02:05 is same minute', () => assertThat(
    isSameMinute('2000-01-03T01:02:03', '2000-01-03T01:02:05'), equalTo(true)));

  it('2000-01-03T01:03:04 and 2000-01-03T01:04:04 is NOT same minute', () => assertThat(
    isSameMinute('2000-01-03T01:03:04', '2000-01-03T01:04:04'), equalTo(false)));

  it('can be curried', () => assertThat(
    isSameMinute('2000-01-03T01:03:04')('2000-01-03T01:04:04'), equalTo(false)));
});

describe('isSameSecond', () => {
  it('2000-01-03T01:02:03 and 2000-01-03T01:02:03 is same minute', () => assertThat(
    isSameSecond('2000-01-03T01:02:03', '2000-01-03T01:02:03'), equalTo(true)));

  it('2000-01-03T01:03:04 and 2000-01-03T01:03:05 is NOT same minute', () => assertThat(
    isSameSecond('2000-01-03T01:03:04', '2000-01-03T01:03:05'), equalTo(false)));

  it('can be curried', () => assertThat(
    isSameSecond('2000-01-03T01:03:04')('2000-01-03T01:03:05'), equalTo(false)));
});
