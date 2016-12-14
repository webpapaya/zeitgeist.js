import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from '../constants';
import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,
} from '../index';

describe('floor', () => {
  describe('floorSecond', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
      floorSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));

    it('2000-01-01T11:12:13.123+01:00 results in 2000-01-01T11:12:13+01:00', () => assertThat(
      floorSecond('2000-01-01T11:12:13.123+01:00'), equalTo('2000-01-01T11:12:13+01:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      floorSecond('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('floorMinute', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:00', () => assertThat(
      floorMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T11:12:00+10:00', () => assertThat(
      floorMinute('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T11:12:00+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      floorMinute('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('floorHour', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:00:00', () => assertThat(
      floorHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T11:00:00+10:00', () => assertThat(
      floorHour('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T11:00:00+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      floorHour('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('floorDay', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorDay('2000-01-01T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

    it('2000-01-01T11:12:13.123+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
      floorDay('2000-01-01T11:12:13.123+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      floorDay('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('floorMonth', () => {
    it('2000-01-05T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorMonth('2000-01-05T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

    it('2000-01-05T11:12:13.123+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
      floorMonth('2000-01-05T11:12:13.123+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      floorMonth('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('floorYear', () => {
    it('2000-02-05T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorYear('2000-02-05T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

    it('2000-02-05T11:12:13.123+10:00 results in 2000-01-01T00:00:00+10:00', () => assertThat(
      floorYear('2000-02-05T11:12:13.123+10:00'), equalTo('2000-01-01T00:00:00+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      floorYear('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });
});
