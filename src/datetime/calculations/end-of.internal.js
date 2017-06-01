import { compose } from '../../utils';
import {
  toFragments,
  toIso,
} from '../index';

import {
  ceilMinute,
  ceilHour,
  ceilDay,
  ceilMonth,
  ceilYear,
  ceilWeek,
} from './ceil.internal';

import subtractSeconds from '../subtract-seconds';
import subtractMinutes from '../subtract-minutes';
import subtractHours from '../subtract-hours';
import subtractDays from '../subtract-days';
import subtractMonths from '../subtract-months';

export const endOfSecond = (isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, second: Math.floor(fragments.second) + 0.999999 });
};

export const endOfMinute = (isoDatetime) => compose(
  ceilMinute,
  subtractSeconds(1),
  endOfSecond,
)(isoDatetime);

export const endOfHour = (isoDatetime) => compose(
  ceilHour,
  subtractMinutes(1),
  endOfMinute,
)(isoDatetime);

export const endOfDay = (isoDatetime) => compose(
  ceilDay,
  subtractHours(1),
  endOfHour,
)(isoDatetime);

export const endOfMonth = (isoDatetime) => compose(
  ceilMonth,
  subtractDays(1),
  endOfDay,
)(isoDatetime);

export const endOfYear = (isoDatetime) => compose(
  ceilYear,
  subtractMonths(1),
  endOfMonth,
)(isoDatetime);

export const endOfWeek = (isoDatetime) => compose(
  ceilWeek,
  subtractDays(1),
  endOfDay,
)(isoDatetime);
