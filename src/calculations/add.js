import { DECEMBER } from '../constants';
import { subtractDays } from './subtract'
import { toFragments, toIso, isLastDayOfMonth } from '../index';

const isLastDayOfYear = (isoString) => {
  const { month } = toFragments(isoString);
  return month === DECEMBER && isLastDayOfMonth(isoString);
};

const isLastMonthOfYear = (isoString) => {
  const { month } = toFragments(isoString);
  return month === DECEMBER;
};

const setFragments = (isoString, fragments) => {
  const originalFragments = toFragments(isoString);
  return toIso({ ...originalFragments, ...fragments });
};

const jumpToFirstMonthOfYear = (isoString) =>
  setFragments(isoString, { month: 1 });

const jumpToFirstDayOfMonth = (isoString) =>
  setFragments(isoString, { day: 1 });

const jumpToNextYear = (isoString) => {
  const fragments = toFragments(isoString);
  return setFragments(isoString, { year: fragments.year + 1 });
};

const jumpToNextMonth = (isoString) => {
  const fragments = toFragments(isoString);
  return setFragments(isoString, { month: fragments.month + 1 });
};

const jumpToNextDay = (isoString) => {
  const fragments = toFragments(isoString);
  return setFragments(isoString, { day: fragments.day + 1 });
};

export const addDays = (isoString, days) => {
  if(days === 0) { return isoString; }
  if(days < 0) { return subtractDays(isoString, days * -1); }

  if(isLastDayOfYear(isoString)) {
    return addDays(
      jumpToFirstMonthOfYear(
        jumpToFirstDayOfMonth(
          jumpToNextYear(isoString))), days - 1);
  }

  if(isLastDayOfMonth(isoString)) {
    return addDays(
      jumpToFirstDayOfMonth(
        jumpToNextMonth(isoString)), days - 1);
  }

  return addDays(jumpToNextDay(isoString), days - 1);
};

export const addMonths = (isoString, months) => {
  if(months === 0) { return isoString; }

  if(isLastMonthOfYear(isoString)) {
    return addMonths(
        jumpToFirstMonthOfYear(
          jumpToNextYear(isoString)), months - 1);
  }

  return addMonths(jumpToNextMonth(isoString), months - 1);
};

export const addYears = (isoString, years) => {
  if(years === 0) { return isoString; }
  return addYears(jumpToNextYear(isoString), years - 1);
};
