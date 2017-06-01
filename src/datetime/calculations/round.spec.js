import { assertThat, equalTo } from 'hamjest';
import { INVALID_DATETIME } from '../constants';
import {
  roundSecond,
  roundMinute,
  roundHour,
  roundDay,
  roundMonth,
  roundYear,
} from '../index';

describe('round', () => {
  describe('roundSecond', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13.000')));

    it('2000-01-01T11:12:31.123 is ceiled', () => assertThat(
      roundSecond('2000-01-01T11:12:13.5'), equalTo('2000-01-01T11:12:14.0')));

    it('2000-01-01T11:12:31.5+10:00 doesn\'t drop timezone', () => assertThat(
      roundSecond('2000-01-01T11:12:13.5+10:00'), equalTo('2000-01-01T11:12:14.0+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      roundSecond('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('roundMinute', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00.000')));

    it('2000-01-01T11:31:13.123 ceiled', () => assertThat(
      roundMinute('2000-01-01T11:31:31.123'), equalTo('2000-01-01T11:32:00.000')));

    it('2000-01-01T11:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
      roundMinute('2000-01-01T11:31:31.123+10:00'), equalTo('2000-01-01T11:32:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      roundMinute('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('roundHour', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00.000')));

    it('2000-01-01T11:31:13.123 is ceiled', () => assertThat(
      roundHour('2000-01-01T12:31:13.123'), equalTo('2000-01-01T13:00:00.000')));

    it('2000-01-01T11:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
      roundHour('2000-01-01T12:31:13.123+10:00'), equalTo('2000-01-01T13:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      roundHour('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('roundDay', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundDay('2000-01-01T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

    it('2000-01-01T12:31:13.123 is ceiled', () => assertThat(
      roundDay('2000-01-01T12:31:13.123'), equalTo('2000-01-02T00:00:00.000')));

    it('2000-01-01T12:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
      roundDay('2000-01-01T12:31:13.123+10:00'), equalTo('2000-01-02T00:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      roundDay('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('roundMonth', () => {
    it('2000-01-02T11:12:13.123 is floored', () => assertThat(
      roundMonth('2000-01-02T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

    it('2000-01-16T12:31:13.123 is ceiled', () => assertThat(
      roundMonth('2000-01-16T12:31:13.123'), equalTo('2000-02-01T00:00:00.000')));

    it('2000-01-16T12:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
      roundMonth('2000-01-16T12:31:13.123+10:00'), equalTo('2000-02-01T00:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      roundMonth('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });

  describe('roundYear', () => {
    it('2000-02-01T11:12:13.123 is floored', () => assertThat(
      roundYear('2000-02-01T11:12:13.123'), equalTo('2000-01-01T00:00:00.000')));

    it('2000-06-16T12:31:13.123 is ceiled', () => assertThat(
      roundYear('2000-06-16T12:31:13.123'), equalTo('2001-01-01T00:00:00.000')));

    it.skip('2000-05-60T12:31:13.123 is ceiled', () => assertThat(
      roundYear('2000-05-60T12:31:13.123'), equalTo('2001-01-01T00:00:00.000')));

    it('2000-05-60T12:31:13.123+10:00 doesn\'t drop timezone', () => assertThat(
      roundYear('2000-06-01T12:31:13.123+10:00'), equalTo('2001-01-01T00:00:00.000+10:00')));

    it('`I\'m Invalid` results in `INVALID_DATETIME`', () => assertThat(
      roundYear('I\'m Invalid'), equalTo(INVALID_DATETIME)));
  });
});

