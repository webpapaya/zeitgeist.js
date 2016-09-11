import { toIso, toFragments } from '../index';

const floorSeconds = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) });
};

const floorMinutes = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: 0 });
};

const floorHours = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, minute: 0, second: 0 });
};

import { assertThat, equalTo } from 'hamjest';

describe.only('round', () => {
  describe('floorSeconds', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
      floorSeconds('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));
  });

  describe('floorMinutes', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T11:00:00', () => assertThat(
      floorMinutes('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:00')));
  });

  describe('floorHours', () => {
    it('2000-01-01T11:12:13.123 results in 2000-01-01T00:00:00', () => assertThat(
      floorHours('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:00:00')));
  });
});



