import { DECEMBER } from '../constants';
import {
  toFragments,
  toIso,
  isLastDayOfMonth,
  subtractDays,
  subtractMonths,
  floorMinute,
  floorHour,
  floorDay,

  fromJulianDate,
  toJulianDate,
} from '../index';

import { tco } from '../utils';

// TODO: add leap seconds
const isLastSecondOfMinute = ({ second }) => second === 59;
const isLastSecondOfHour = ({ second, minute }) => second === 59 && minute === 59;
const isLastSecondOfDay = ({ second, minute, hour }) => second === 59 && minute === 59 && hour === 23;

const isLastMonthOfYear = ({ month }) => month === DECEMBER;
const isLastDayOfYear = (fragments) =>
  fragments.month === DECEMBER && isLastDayOfMonth(fragments);

const jumpToFirstMonthOfYear = (fragments) => ({ ...fragments, month: 1 });
const jumpToFirstDayOfMonth = (fragments) => ({ ...fragments, day: 1 });

const jumpToNextSecond = (fragments) => ({ ...fragments, second: fragments.second + 1 });
const jumpToNextMinute = (fragments) => ({ ...fragments, minute: fragments.minute + 1 });
const jumpToNextHour = (fragments) => ({ ...fragments, hour: fragments.hour + 1 });

const jumpToNextDay = (fragments) => ({ ...fragments, day: fragments.day + 1 });
const jumpToNextMonth = (fragments) => ({ ...fragments, month: fragments.month + 1 });
const jumpToNextYear = (fragments) => ({ ...fragments, year: fragments.year + 1 });

export const addSeconds = tco((isoStringOrFragments, seconds) => {
  if (seconds === 0) { return toIso(isoStringOrFragments); }
  const fragments = toFragments(isoStringOrFragments);

  if(isLastSecondOfDay(fragments)) {
    return addSeconds(
      floorDay(
        jumpToNextDay(fragments)), seconds - 1);
  }

  if (isLastSecondOfHour(fragments)) {
    return addSeconds(
      floorHour(
        jumpToNextHour(fragments)), seconds - 1);
  }

  if (isLastSecondOfMinute(fragments)) {
    return addSeconds(
      floorMinute(
        jumpToNextMinute(fragments, 1)), seconds - 1);
  }

  return addSeconds(jumpToNextSecond(fragments), seconds - 1);
});

export const addMinutes = () => {};
export const addHours = () => {};

export const addDays = (isoStringOrFragments, days) =>
  fromJulianDate(toJulianDate(isoStringOrFragments) + days);

export const addMonths = tco((isoStringOrFragments, months) => {
  if (months === 0) { return toIso(isoStringOrFragments); }
  if (months < 0) { return subtractMonths(isoStringOrFragments, months * -1); }

  const fragments = toFragments(isoStringOrFragments);
  if (isLastMonthOfYear(fragments)) {
    return addMonths(
        jumpToFirstMonthOfYear(
          jumpToNextYear(fragments)), months - 1);
  }

  return addMonths(jumpToNextMonth(fragments), months - 1);
});

export const addYears = (isoStringOrFragments, years) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
};
