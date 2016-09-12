import { toIso, toFragments } from '../index';

export const floorSecond = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) });
};

export const floorMinute = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: 0 });
};

export const floorHour = (isoString) => {
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
