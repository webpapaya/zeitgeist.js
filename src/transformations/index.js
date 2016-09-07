import { separateDateAndTimeComponents, toFragments } from './to-fragments';

export const removeTimeComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).dateComponent;

export const removeDateComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).timeComponent;

export const toInt = (isoString) => {
  const fragments = toFragments(isoString)
  return [
    fragments.year || 0,
    fragments.month || 0,
    fragments.day || 0,
    fragments.hour || 0,
    fragments.minute || 0,
    fragments.second || 0,
  ].join('');
};

export { toFragments } from './to-fragments';
export { toIso, toIsoDate, toIsoTime } from './to-iso';
