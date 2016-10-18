import {
  toIso,
  toFragments,
} from '../index';

const prepareArg = (fn) => (isoDuration) => toIso(fn(toFragments(isoDuration)));

const floorSecond = prepareArg((fragments) => ({
  ...fragments, seconds: Math.floor( fragments.seconds )
}));

const floorMinute = prepareArg((fragments) => ({
  ...fragments,
  minutes: Math.floor(fragments.minutes),
  seconds: 0,
}));

const floorHour = prepareArg((fragments) => ({
  hours: Math.floor(fragments.hours),
  minutes: 0,
  seconds: 0,
}));

const floorDay = prepareArg((fragments) => ({
  ...fragments,
  days: Math.floor(fragments.days),
  hours: 0,
  minutes: 0,
  seconds: 0,
}));

const floorWeek = prepareArg((fragments) => ({
  ...fragments,
  weeks:  Math.floor(fragments.weeks),
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}));

const floorMonth = prepareArg((fragments) => ({
  ...fragments,
  months: Math.floor(fragments.months),
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}));

const floorYear = prepareArg((fragments) => ({
  ...fragments,
  year: Math.floor(fragments.months),
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}));


import { assertThat, equalTo } from 'hamjest';

describe.only('floor', () => {
  describe('floorSecond', () => {
    it('PT1.123S results in PT1S', () => assertThat(
      floorSecond('PT1.123S'), equalTo('PT1S')));

    it('PT1M1.123S results in PT1M1S', () => assertThat(
      floorSecond('PT1M1.123S'), equalTo('PT1M1S')));
  });

  describe('floorMinute', () => {
    it('PT1M1.123S results in PT1M', () => assertThat(
      floorMinute('PT1M1.123S'), equalTo('PT1M')));
  });

  describe('floorHour', () => {
    it('PT1H1M1.123S results in PT1H', () => assertThat(
      floorHour('PT1H1M1.123S'), equalTo('PT1H')));
  });

  describe('floorDay', () => {
    it('P1DT1H1M1.123S results in PT1H', () => assertThat(
      floorDay('P1DT1H1M1.123S'), equalTo('P1D')));
  });

  describe('floorWeek', () => {
    it('P1W1DT1H1M1.123S results in P1W', () => assertThat(
      floorWeek('P1W1DT1H1M1.123S'), equalTo('P1W')));
  });

  describe('floorMonth', () => {
    it('P1M1W1DT1H1M1.123S results in P1M', () => assertThat(
      floorMonth('P1M1W1DT1H1M1.123S'), equalTo('P1M')));
  });

  describe('floorYear', () => {
    it('P1Y1M1W1DT1H1M1.123S results in P1Y', () => assertThat(
      floorYear('P1Y1M1W1DT1H1M1.123S'), equalTo('P1Y')));
  });
});



