import { DECEMBER } from '../constants';
import { subtractDays } from './subtract'
import { toFragments, toIso, isLastDayOfMonth } from '../index';

const isLastDayOfYear = (isoString) => {
  const { month } = toFragments(isoString);
  return month === DECEMBER && isLastDayOfMonth(isoString);
};

const jumpToNextYear = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, year: fragments.year + 1, month: 1, day: 1 });
};

const jumpToNextMonth = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, month: fragments.month + 1, day: 1 });
};

const jumpToNextDay = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, day: fragments.day + 1 });
};

export const addDays = (isoString, days) => {
  if(days === 0) { return isoString; }
  if(days < 0) { return subtractDays(isoString, days * -1); }

  if(isLastDayOfYear(isoString)) {
    return addDays(jumpToNextYear(isoString), days - 1);
  }

  if(isLastDayOfMonth(isoString)) {
    return addDays(jumpToNextMonth(isoString), days - 1);
  }

  return addDays(jumpToNextDay(isoString), days - 1);
};
