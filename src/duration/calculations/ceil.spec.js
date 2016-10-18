import { assertThat, equalTo } from 'hamjest';
import {
  ceilSecond,
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilWeek,
  ceilMonth,
  ceilYear
} from './ceil';


describe('ceil', () => {
  describe('ceilSecond', () => {
    it('PT1.123S results in PT2S', () => assertThat(
      ceilSecond('PT1.123S'), equalTo('PT2S')));
  });

  describe('ceilMinute', () => {
    it('PT1M1.123S results in PT2S', () => assertThat(
      ceilMinute('PT1M1.123S'), equalTo('PT2M')));
  });

  describe('ceilHour', () => {
    it('PT1H1M1.123S results in PT2H', () => assertThat(
      ceilHour('PT1H1M1.123S'), equalTo('PT2H')));
  });

  describe('ceilDay', () => {
    it('P1DT1H1M1.123S results in P2D', () => assertThat(
      ceilDay('P1DT1H1M1.123S'), equalTo('P2D')));
  });

  describe('ceilWeek', () => {
    it('P1W1DT1H1M1.123S results in P2D', () => assertThat(
      ceilWeek('P1W1DT1H1M1.123S'), equalTo('P2W')));
  });

  describe('ceilMonth', () => {
    it('P1M1W1DT1H1M1.123S results in P2M', () => assertThat(
      ceilMonth('P1M1W1DT1H1M1.123S'), equalTo('P2M')));
  });

  describe('ceilYear', () => {
    it('P1Y1M1W1DT1H1M1.123S results in P2Y', () => assertThat(
      ceilYear('P1Y1M1W1DT1H1M1.123S'), equalTo('P2Y')));
  });
});
