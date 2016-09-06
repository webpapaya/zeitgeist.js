import { separateDateAndTimeComponents } from './to-fragments';

export const removeTimeComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).dateComponent;

export const removeDateComponent = (isoString) =>
  separateDateAndTimeComponents(isoString).timeComponent;

export { toFragments } from './to-fragments';
export { toIso, toIsoDate, toIsoTime } from './to-iso';
