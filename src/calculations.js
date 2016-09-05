import { DECEMBER, JANUARY } from './constants';
import { toFragments, toIso, daysInMonth, daysInYear, isLastDayOfMonth } from './index';


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

const isFirstDayOfYear = (isoString) => {
  const { month, day } = toFragments(isoString);
  return month === JANUARY && day === 1;
};

const isFirstDayOfMonth = (isoString) => {
  const { day } = toFragments(isoString);
  return day === 1;
};

const jumpToPreviousDay = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, day: fragments.day - 1 });
};

const jumpToPreviousYear = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, year: fragments.year - 1, month: 12, day: 31 });
};

const jumpToPreviousMonth = (isoString) => {
  const fragments = toFragments(isoString);
  const previousMonth = toIso({
    year: fragments.year,
    month: fragments.month === JANUARY ? DECEMBER : fragments.month - 1
  });
  const day = daysInMonth(previousMonth);

  return toIso({ ...fragments, month: fragments.month - 1, day: day });
};

export const subtractDays = (isoString, days) => {
  if(days === 0) { return isoString; }
  if(days < 0) { return addDays(isoString, days * -1); }

  if(isFirstDayOfYear(isoString)) {
    return subtractDays(jumpToPreviousYear(isoString), days - 1);
  }

  if(isFirstDayOfMonth(isoString)) {
    return subtractDays(jumpToPreviousMonth(isoString), days - 1);
  }

  return subtractDays(jumpToPreviousDay(isoString), days - 1);
};
