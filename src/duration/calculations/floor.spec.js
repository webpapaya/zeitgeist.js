import { assertThat, equalTo } from 'hamjest';
import { INVALID_DURATION } from '../constants';
import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorWeek,
  floorMonth,
  floorYear,
} from './index';

describe('floor', () => {
  describe('floorSecond', () => {
    it('PT1.123S results in PT1S', () => assertThat(
      floorSecond('PT1.123S'), equalTo('PT1S')));

    it('PT1M1.123S results in PT1M1S', () => assertThat(
      floorSecond('PT1M1.123S'), equalTo('PT1M1S')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorSecond('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('floorMinute', () => {
    it('PT1M1.123S results in PT1M', () => assertThat(
      floorMinute('PT1M1.123S'), equalTo('PT1M')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorMinute('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('floorHour', () => {
    it('PT1H1M1.123S results in PT1H', () => assertThat(
      floorHour('PT1H1M1.123S'), equalTo('PT1H')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorHour('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('floorDay', () => {
    it('P1DT1H1M1.123S results in PT1H', () => assertThat(
      floorDay('P1DT1H1M1.123S'), equalTo('P1D')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorDay('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('floorWeek', () => {
    it('P1W1DT1H1M1.123S results in P1W', () => assertThat(
      floorWeek('P1W1DT1H1M1.123S'), equalTo('P1W')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorWeek('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('floorMonth', () => {
    it('P1M1W1DT1H1M1.123S results in P1M', () => assertThat(
      floorMonth('P1M1W1DT1H1M1.123S'), equalTo('P1M')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorMonth('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('floorYear', () => {
    it('P1Y1M1W1DT1H1M1.123S results in P1Y', () => assertThat(
      floorYear('P1Y1M1W1DT1H1M1.123S'), equalTo('P1Y')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      floorYear('I\'m invalid'), equalTo(INVALID_DURATION)));
  });
});

