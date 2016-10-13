import {
  toFragments as toDurationFragments,
} from '../../duration/index';

import { compose } from '../../utils';

import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

const _addMonths = (months) => (isoString) => addMonths(months, isoString);
const _addYears = (years) => (isoString) => addYears(years, isoString);
const _addDays = (days) => (isoString) => addDays(days, isoString);
const _addHours = (hours) => (isoString) => addHours(hours, isoString);
const _addMinutes = (minutes) => (isoString) => addMinutes(minutes, isoString);
const _addSeconds = (seconds) => (isoString) => addSeconds(seconds, isoString);

export const subtractDuration = (isoString, isoDuration) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return compose(
    _addDays(days * -1),
    _addMonths(months * -1),
    _addYears(years * -1),
    _addHours(hours * -1),
    _addMinutes(minutes * -1),
    _addSeconds(seconds * -1),
  )(isoString);
};

export const subtractSeconds = (seconds, isoString) => addSeconds(seconds * -1, isoString);
export const subtractMinutes = (minutes, isoString) => addMinutes(minutes * -1, isoString);
export const subtractHours = (hours, isoString) => addHours(hours * -1, isoString);

export const subtractDays = (days, isoString) => addDays(days * -1, isoString);
export const subtractMonths = (months, isoString) => addMonths(months * -1, isoString);
export const subtractYears = (years, isoString) => addYears(years * -1, isoString);
