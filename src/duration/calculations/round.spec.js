import {
  toIso,
  toFragments,
} from '../index';

const floorSecond = (isoDuration) => {
  const fragments = toFragments(isoDuration);
  return toIso({ ...fragments, seconds: Math.floor( fragments.seconds )})
};

const floorMinute = (isoDuration) => {
  const fragments = toFragments(isoDuration);
  return toIso({ ...fragments, minutes: Math.floor(fragments.minutes), seconds: 0 })
};

const floorHour = (isoDuration) => {
  const fragments = toFragments(isoDuration);
  return toIso({ ...fragments,
    hours: Math.floor(fragments.hours),
    minutes: 0,
    seconds: 0,
  });
};



import { assertThat, equalTo } from 'hamjest';

describe.only('floor', () => {
  describe('floorSecond', () => {
    it('PT1.123S results in PT1S', () => assertThat(
      floorSecond('PT1.123S'), equalTo('PT1S')));
  });

  describe('floorMinute', () => {
    it('PT1M1.123S results in PT1M', () => assertThat(
      floorMinute('PT1M1.123S'), equalTo('PT1M')));
  });

  describe('floorHour', () => {
    it('PT1H1M1.123S results in PT1H', () => assertThat(
      floorHour('PT1H1M1.123S'), equalTo('PT1H')));
  });
});



