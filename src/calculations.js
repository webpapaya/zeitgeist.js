import { toFragments, toIso, daysInMonth, isLastDayOfMonth } from './index';

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

  const fragments = toFragments(isoString);
  const newIsoString = isLastDayOfMonth(isoString)
    ? jumpToNextMonth(isoString)
    : jumpToNextDay(isoString);

  return addDays(newIsoString, days - 1);
};
