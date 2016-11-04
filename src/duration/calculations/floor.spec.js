import { assertThat, equalTo } from 'hamjest';
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

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorSecond('I\'m invalid'), equalTo('Invalid Duration')));
  });

  describe('floorMinute', () => {
    it('PT1M1.123S results in PT1M', () => assertThat(
      floorMinute('PT1M1.123S'), equalTo('PT1M')));

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorMinute('I\'m invalid'), equalTo('Invalid Duration')));
  });

  describe('floorHour', () => {
    it('PT1H1M1.123S results in PT1H', () => assertThat(
      floorHour('PT1H1M1.123S'), equalTo('PT1H')));

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorHour('I\'m invalid'), equalTo('Invalid Duration')));
  });

  describe('floorDay', () => {
    it('P1DT1H1M1.123S results in PT1H', () => assertThat(
      floorDay('P1DT1H1M1.123S'), equalTo('P1D')));

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorDay('I\'m invalid'), equalTo('Invalid Duration')));
  });

  describe('floorWeek', () => {
    it('P1W1DT1H1M1.123S results in P1W', () => assertThat(
      floorWeek('P1W1DT1H1M1.123S'), equalTo('P1W')));

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorWeek('I\'m invalid'), equalTo('Invalid Duration')));
  });

  describe('floorMonth', () => {
    it('P1M1W1DT1H1M1.123S results in P1M', () => assertThat(
      floorMonth('P1M1W1DT1H1M1.123S'), equalTo('P1M')));

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorMonth('I\'m invalid'), equalTo('Invalid Duration')));
  });

  describe('floorYear', () => {
    it('P1Y1M1W1DT1H1M1.123S results in P1Y', () => assertThat(
      floorYear('P1Y1M1W1DT1H1M1.123S'), equalTo('P1Y')));

    it('`I\'m invalid` responds Invalid Format', () => assertThat(
      floorYear('I\'m invalid'), equalTo('Invalid Duration')));
  });
});

