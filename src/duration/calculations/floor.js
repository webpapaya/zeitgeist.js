import {
  toIso,
  toFragments,
  isValid,
} from '../index';

import { UNIT_NAMES, INVALID_DURATION } from '../constants';

const validate = (fn) => (isoDruation) => isValid(isoDruation)
  ? fn(isoDruation)
  : INVALID_DURATION;

const prepareArg = (fn) => validate((isoDuration) => toIso(fn(toFragments(isoDuration))));
const { seconds, minutes, hours, days, weeks, months, years } = UNIT_NAMES;

export const floorSecond = prepareArg((fragments) => ({
  ...fragments, seconds: Math.floor(fragments.seconds),
}));

export const floorMinute = prepareArg((fragments) => ({
  ...fragments,
  [minutes]: Math.floor(fragments.minutes),
  [seconds]: 0,
}));

export const floorHour = prepareArg((fragments) => ({
  [hours]: Math.floor(fragments.hours),
  [minutes]: 0,
  [seconds]: 0,
}));

export const floorDay = prepareArg((fragments) => ({
  ...fragments,
  [days]: Math.floor(fragments.days),
  [hours]: 0,
  [minutes]: 0,
  [seconds]: 0,
}));

export const floorWeek = prepareArg((fragments) => ({
  ...fragments,
  [weeks]: Math.floor(fragments.weeks),
  [days]: 0,
  [hours]: 0,
  [minutes]: 0,
  [seconds]: 0,
}));

export const floorMonth = prepareArg((fragments) => ({
  ...fragments,
  [months]: Math.floor(fragments.months),
  [weeks]: 0,
  [days]: 0,
  [hours]: 0,
  [minutes]: 0,
  [seconds]: 0,
}));

export const floorYear = prepareArg((fragments) => ({
  ...fragments,
  [years]: Math.floor(fragments.years),
  [months]: 0,
  [weeks]: 0,
  [days]: 0,
  [hours]: 0,
  [minutes]: 0,
  [seconds]: 0,
}));
