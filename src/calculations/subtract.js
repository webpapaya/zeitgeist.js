import { DECEMBER, JANUARY } from '../constants';
import { addDays } from './add'
import { toFragments, toIso, daysInMonth } from '../index';

const isFirstDayOfYear = ({ month, day }) => month === JANUARY && day === 1;
const isFirstMonthOfYear = ({ month }) => month === JANUARY;
const isFirstDayOfMonth = ({ day }) => day === 1;

const jumpToPreviousDay = (fragments) => ({ ...fragments, day: fragments.day - 1 });
const jumpToLastMonthOfYear = (fragments) => ({ ...fragments, month: DECEMBER });
const jumpToLastDayOfMonth = (fragments) => ({ ...fragments, day: daysInMonth(fragments) });
const jumpToPreviousYear = (fragments) => ({ ...fragments, year: fragments.year - 1 });
const jumpToPreviousMonth = (fragments) => ({ ...fragments, month: fragments.month - 1 });

export const subtractDays = (isoString, days) => {
  if(days === 0) { return toIso(isoString); }
  if(days < 0) { return addDays(isoString, days * -1); }

  const fragments = toFragments(isoString);

  if(isFirstDayOfYear(fragments)) {
    return subtractDays(
      jumpToLastDayOfMonth(
        jumpToLastMonthOfYear(
          jumpToPreviousYear(fragments))), days - 1);
  }

  if(isFirstDayOfMonth(fragments)) {
    return subtractDays(
      jumpToLastDayOfMonth(
        jumpToPreviousMonth(fragments)), days - 1);
  }

  return subtractDays(jumpToPreviousDay(fragments), days - 1);
};

export const subtractMonths = (isoString, months) => {
  if(months === 0) { return toIso(isoString); }
  const fragments = toFragments(isoString);

  if(isFirstMonthOfYear(fragments)) {
    return subtractMonths(
      jumpToLastMonthOfYear(
        jumpToPreviousYear(fragments)), months - 1);
  }

  return subtractMonths(jumpToPreviousMonth(fragments), months - 1);
};

export const subtractYears = (isoString, years) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, year: fragments.year - years })
};
