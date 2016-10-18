import { assertThat, equalTo } from 'hamjest';
import {
  ceilSecond,
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,

  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorMonth,
  floorYear,

  roundSecond,
  roundMinute,
  roundHour,
  roundDay,
  roundMonth,
  roundYear,
} from './index';

describe('floor', () => {
  describe('floorSecond', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
      floorSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));
  });

  describe('floorMinute', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:00', () => assertThat(
      floorMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00')));
  });

  describe('floorHour', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:00:00', () => assertThat(
      floorHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00')));
  });

  describe('floorDay', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorDay('2000-01-01T11:12:13.123'), equalTo('2000-01-01T00:00:00')));
  });

  describe('floorMonth', () => {
    it('2000-01-05T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorMonth('2000-01-05T11:12:13.123'), equalTo('2000-01-01T00:00:00')));
  });

  describe('floorYear', () => {
    it('2000-02-05T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorYear('2000-02-05T11:12:13.123'), equalTo('2000-01-01T00:00:00')));
  });
});

describe('ceil', () => {
  describe('ceilSecond', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:14', () => assertThat(
      ceilSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:14')));
  });

  describe('ceilMinute', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:13:00', () => assertThat(
      ceilMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:13:00')));
  });

  describe('ceilHour', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T12:00:00', () => assertThat(
      ceilHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T12:00:00')));
  });

  describe('ceilDay', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-02T00:00:00', () => assertThat(
      ceilDay('2000-01-01T11:12:13.123'), equalTo('2000-01-02T00:00:00')));
  });

  describe('ceilMonth', () => {
    it('2000-01-01T11:12:13.123 results in 2000-02-01T00:00:00', () => assertThat(
      ceilMonth('2000-01-01T11:12:13.123'), equalTo('2000-02-01T00:00:00')));
  });

  describe('ceilYear', () => {
    it('2000-01-01T11:12:13.123 results in 2001-00-01T00:00:00', () => assertThat(
      ceilYear('2000-01-01T11:12:13.123'), equalTo('2001-01-01T00:00:00')));
  });
});

describe('round', () => {
  describe('roundSecond', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));

    it('2000-01-01T11:12:31.123 is ceiled', () => assertThat(
      roundSecond('2000-01-01T11:12:13.5'), equalTo('2000-01-01T11:12:14')));
  });

  describe('roundMinute', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundMinute('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00')));

    it('2000-01-01T11:31:13.123 ceiled', () => assertThat(
      roundMinute('2000-01-01T11:31:31.123'), equalTo('2000-01-01T11:32:00')));
  });

  describe('roundHour', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundHour('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00')));

    it('2000-01-01T11:31:13.123 is ceiled', () => assertThat(
      roundHour('2000-01-01T12:31:13.123'), equalTo('2000-01-01T13:00:00')));
  });

  describe('roundDay', () => {
    it('2000-01-01T11:12:13.123 is floored', () => assertThat(
      roundDay('2000-01-01T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

    it('2000-01-01T12:31:13.123 is ceiled', () => assertThat(
      roundDay('2000-01-01T12:31:13.123'), equalTo('2000-01-02T00:00:00')));
  });

  describe('roundMonth', () => {
    it('2000-01-02T11:12:13.123 is floored', () => assertThat(
      roundMonth('2000-01-02T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

    it('2000-01-16T12:31:13.123 is ceiled', () => assertThat(
      roundMonth('2000-01-16T12:31:13.123'), equalTo('2000-02-01T00:00:00')));
  });

  describe('roundYear', () => {
    it('2000-02-01T11:12:13.123 is floored', () => assertThat(
      roundYear('2000-02-01T11:12:13.123'), equalTo('2000-01-01T00:00:00')));

    it('2000-06-16T12:31:13.123 is ceiled', () => assertThat(
      roundYear('2000-06-16T12:31:13.123'), equalTo('2001-01-01T00:00:00')));

    it('2000-05-60T12:31:13.123 is ceiled', () => assertThat(
      roundYear('2000-05-60T12:31:13.123'), equalTo('2001-01-01T00:00:00')));
  });
});
