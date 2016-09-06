import { DECEMBER, JANUARY } from '../constants';
import { addDays } from './add'
import { toFragments, toIso, daysInMonth } from '../index';

const isFirstDayOfYear = ({ month, day }) => month === JANUARY && day === 1;
const isFirstDayOfMonth = ({ day }) => day === 1;

const jumpToPreviousDay = (fragments) =>
  toIso({ ...fragments, day: fragments.day - 1 });

const jumpToPreviousYear = (fragments) =>
  toIso({ ...fragments, year: fragments.year - 1, month: 12, day: 31 });

const jumpToPreviousMonth = (fragments) => {
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

  const fragments = toFragments(isoString);

  if(isFirstDayOfYear(fragments)) {
    return subtractDays(jumpToPreviousYear(fragments), days - 1);
  }

  if(isFirstDayOfMonth(fragments)) {
    return subtractDays(jumpToPreviousMonth(fragments), days - 1);
  }

  return subtractDays(jumpToPreviousDay(fragments), days - 1);
};

export const subtractYears = (isoString, years) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, year: fragments.year - years })
};
