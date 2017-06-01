import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from '../constants';
import {
  ceilSecond,
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,
} from '../index';

describe('ceil', () => {
  describe('ceilSecond', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:14', () => assertThat(
      ceilSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:14.000')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T11:12:14+10:00', () => assertThat(
      ceilSecond('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T11:12:14.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      ceilSecond('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('ceilMinute', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:13:00', () => assertThat(
      ceilMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:13:00.000')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T11:13:00+10:00', () => assertThat(
      ceilMinute('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T11:13:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      ceilMinute('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('ceilHour', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T12:00:00', () => assertThat(
      ceilHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T12:00:00.000')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T12:00:00+10:00', () => assertThat(
      ceilHour('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T12:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      ceilHour('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('ceilDay', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-02T00:00:00', () => assertThat(
      ceilDay('2000-01-01T11:12:13.123'), equalTo('2000-01-02T00:00:00.000')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-02T00:00:00+10:00', () => assertThat(
      ceilDay('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-02T00:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      ceilDay('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('ceilMonth', () => {
    it('2000-01-01T11:12:13.123 results in 2000-02-01T00:00:00', () => assertThat(
      ceilMonth('2000-01-01T11:12:13.123'), equalTo('2000-02-01T00:00:00.000')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-02-01T00:00:00+10:00', () => assertThat(
      ceilMonth('2000-01-01T11:12:13.123+10:00'), equalTo('2000-02-01T00:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      ceilMonth('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('ceilYear', () => {
    it('2000-01-01T11:12:13.123 results in 2001-00-01T00:00:00', () => assertThat(
      ceilYear('2000-01-01T11:12:13.123'), equalTo('2001-01-01T00:00:00.000')));

    it('2000-01-01 results in 2001-00-01', () => assertThat(
      ceilYear('2000-01-01'), equalTo('2001-01-01')));

    it('2000-01-01T11:12:13.123+10:00 results in 2001-00-01T00:00:00+10:00', () => assertThat(
      ceilYear('2000-01-01T11:12:13.123+10:00'), equalTo('2001-01-01T00:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      ceilYear('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });
});

