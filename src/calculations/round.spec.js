import { toIso, toFragments } from '../index';

export const floorSeconds = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) });
};

export const floorMinutes = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: 0 });
};

export const floorHours = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, minute: 0, second: 0 });
};

export const floorDay = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, hour: 0, minute: 0, second: 0 });
};

export const floorMonth = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 });
};

export const floorYear = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 });
};


import { assertThat, equalTo } from 'hamjest';

describe.only('round', () => {
  describe('floorSeconds', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
      floorSeconds('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));
  });

  describe('floorMinutes', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:00', () => assertThat(
      floorMinutes('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00')));
  });

  describe('floorHours', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:00:00', () => assertThat(
      floorHours('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00')));
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



