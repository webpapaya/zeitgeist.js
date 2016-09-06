import { DECEMBER } from '../constants';
import { subtractDays, subtractMonths } from './subtract';
import { toFragments, toIso, isLastDayOfMonth } from '../index';

const isLastMonthOfYear = ({ month }) => month === DECEMBER;
const isLastDayOfYear = (fragments) =>
  fragments.month === DECEMBER && isLastDayOfMonth(fragments);

const jumpToFirstMonthOfYear = (fragments) => ({ ...fragments, month: 1 });
const jumpToFirstDayOfMonth = (fragments) => ({ ...fragments, day: 1 });
const jumpToNextYear = (fragments) => ({ ...fragments, year: fragments.year + 1 });
const jumpToNextMonth = (fragments) => ({ ...fragments, month: fragments.month + 1 });
const jumpToNextDay = (fragments) => ({ ...fragments, day: fragments.day + 1 });

export const addDays = (isoStringOrFragments, days) => {
  if (days === 0) { return toIso(isoStringOrFragments); }
  if (days < 0) { return subtractDays(isoStringOrFragments, days * -1); }

  const fragments = toFragments(isoStringOrFragments);

  if (isLastDayOfYear(fragments)) {
    return addDays(
      jumpToFirstMonthOfYear(
        jumpToFirstDayOfMonth(
          jumpToNextYear(fragments))), days - 1);
  }

  if (isLastDayOfMonth(isoStringOrFragments)) {
    return addDays(
      jumpToFirstDayOfMonth(
        jumpToNextMonth(fragments)), days - 1);
  }

  return addDays(jumpToNextDay(fragments), days - 1);
};

export const addMonths = (isoStringOrFragments, months) => {
  if (months === 0) { return toIso(isoStringOrFragments); }
  if (months < 0) { return subtractMonths(isoStringOrFragments, months * -1); }

  const fragments = toFragments(isoStringOrFragments);
  if (isLastMonthOfYear(fragments)) {
    return addMonths(
        jumpToFirstMonthOfYear(
          jumpToNextYear(fragments)), months - 1);
  }

  return addMonths(jumpToNextMonth(fragments), months - 1);
};

export const addYears = (isoStringOrFragments, years) => {
  const fragments = toFragments(isoStringOrFragments);
  return toIso({ ...fragments, year: fragments.year + years });
};
