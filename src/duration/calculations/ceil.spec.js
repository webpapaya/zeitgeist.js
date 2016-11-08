import { assertThat, equalTo } from 'hamjest';
import { INVALID_DURATION } from '../constants';
import {
  ceilSecond,
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilWeek,
  ceilMonth,
  ceilYear,
} from '../index';

describe('ceil', () => {
  describe('ceilSecond', () => {
    it('PT1.123S results in PT2S', () => assertThat(
      ceilSecond('PT1.123S'), equalTo('PT2S')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilSecond('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('ceilMinute', () => {
    it('PT1M1.123S results in PT2S', () => assertThat(
      ceilMinute('PT1M1.123S'), equalTo('PT2M')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilMinute('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('ceilHour', () => {
    it('PT1H1M1.123S results in PT2H', () => assertThat(
      ceilHour('PT1H1M1.123S'), equalTo('PT2H')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilHour('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('ceilDay', () => {
    it('P1DT1H1M1.123S results in P2D', () => assertThat(
      ceilDay('P1DT1H1M1.123S'), equalTo('P2D')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilDay('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('ceilWeek', () => {
    it('P1W1DT1H1M1.123S results in P2D', () => assertThat(
      ceilWeek('P1W1DT1H1M1.123S'), equalTo('P2W')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilWeek('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('ceilMonth', () => {
    it('P1M1W1DT1H1M1.123S results in P2M', () => assertThat(
      ceilMonth('P1M1W1DT1H1M1.123S'), equalTo('P2M')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilMonth('I\'m invalid'), equalTo(INVALID_DURATION)));
  });

  describe('ceilYear', () => {
    it('P1Y1M1W1DT1H1M1.123S results in P2Y', () => assertThat(
      ceilYear('P1Y1M1W1DT1H1M1.123S'), equalTo('P2Y')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      ceilYear('I\'m invalid'), equalTo(INVALID_DURATION)));
  });
});
