import {
  ONE_MILLISECOND,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
} from './constants';

import {
  findSeconds,
  findHours,
  findMinutes,
  findDays,
  findWeeks,
  findMonths,
  findYears,
  isValid,
} from './index';

const validate = (fn) => (isoDuration, ...args) => isValid(isoDuration)
  ? fn(isoDuration, ...args)
  : 'Invalid Duration';

const asUnit = validate((isoDuration, divider) => {
  const microseconds = asMicroseconds(isoDuration);
  return microseconds / divider;
});

const containsDateUnits = (isoDuration) => {
  return [
    findDays(isoDuration),
    findWeeks(isoDuration),
    findMonths(isoDuration),
    findYears(isoDuration),
  ].some((element) => element !== 0);
};

export const asMicroseconds = validate((isoDuration) => {
  if (containsDateUnits(isoDuration)) { throw new Error('Can\'t convert from date units.'); }
  return [
    findSeconds(isoDuration) * ONE_SECOND,
    findMinutes(isoDuration) * ONE_MINUTE,
    findHours(isoDuration) * ONE_HOUR,
  ].reduce((sum, seconds) => sum + seconds);
});

export const asMilliseconds = (isoDuration) => asUnit(isoDuration, ONE_MILLISECOND);
export const asSeconds = (isoDuration) => asUnit(isoDuration, ONE_SECOND);
export const asMinutes = (isoDuration) => asUnit(isoDuration, ONE_MINUTE);
export const asHours = (isoDuration) => asUnit(isoDuration, ONE_HOUR);
