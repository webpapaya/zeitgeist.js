import { DECEMBER, JANUARY } from '../constants';
import {
  toFragments,
  toIso,
  daysInMonth,
  addDays,
  addMonths,
  addYears,
} from '../index';

const isFirstMonthOfYear = ({ month }) => month === JANUARY;
const jumpToLastMonthOfYear = (fragments) => ({ ...fragments, month: DECEMBER });
const jumpToPreviousYear = (fragments) => ({ ...fragments, year: fragments.year - 1 });
const jumpToPreviousMonth = (fragments) => ({ ...fragments, month: fragments.month - 1 });

export const subtractDays = (isoString, days) =>
  addDays(isoString, days * -1);

export const subtractMonths = (isoStringOrFragments, months) => {
  if (months === 0) { return toIso(isoStringOrFragments); }
  if (months < 0) { return addMonths(isoStringOrFragments, months * -1); }

  const fragments = toFragments(isoStringOrFragments);

  if (isFirstMonthOfYear(fragments)) {
    return subtractMonths(
      jumpToLastMonthOfYear(
        jumpToPreviousYear(fragments)), months - 1);
  }

  return subtractMonths(jumpToPreviousMonth(fragments), months - 1);
};

export const subtractYears = (isoString, years) =>
  addYears(isoString, years * -1);
