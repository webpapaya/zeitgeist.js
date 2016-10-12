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

const _addMonths = (months) => (isoString) => addMonths(isoString, months);
const _addYears = (years) => (isoString) => addYears(isoString, years);
const _addDays = (days) => (isoString) => addDays(isoString, days);
const _addHours = (hours) => (isoString) => addHours(isoString, hours);
const _addMinutes = (minutes) => (isoString) => addMinutes(isoString, minutes);
const _addSeconds = (seconds) => (isoString) => addSeconds(isoString, seconds);

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

export const subtractSeconds = (isoString, seconds) => addSeconds(isoString, seconds * -1);
export const subtractMinutes = (isoString, minutes) => addMinutes(isoString, minutes * -1);
export const subtractHours = (isoString, hours) => addHours(isoString, hours * -1);

export const subtractDays = (isoString, days) => addDays(isoString, days * -1);
export const subtractMonths = (isoString, months) => addMonths(isoString, months * -1);
export const subtractYears = (isoString, years) => addYears(isoString, years * -1);
