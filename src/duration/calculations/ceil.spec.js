import {
  floorSecond,
  floorMinute,
  floorHour,
  floorDay,
  floorWeek,
  floorMonth,
  floorYear,
} from './floor';

import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from '../index';

export const ceilSecond = (isoDuration) => floorSecond(addSeconds(1, isoDuration));
export const ceilMinute = (isoDuration) => floorMinute(addMinutes(1, isoDuration));
export const ceilHour = (isoDuration) => floorHour(addHours(1, isoDuration));
export const ceilDay = (isoDuration) => floorDay(addDays(1, isoDuration));

import { assertThat, equalTo } from 'hamjest';

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

  
});
