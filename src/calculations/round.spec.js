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
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
      roundSecond('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));

    it('2000-01-01T11:12:31.123 results in 2000-01-01T11:13:00', () => assertThat(
      roundSecond('2000-01-01T11:12:13.5'), equalTo('2000-01-01T11:12:14')));
  });
});


