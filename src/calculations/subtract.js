import {
  addDays,
  addMonths,
  addYears,
} from '../index';

export const subtractDays = (isoString, days) =>
  addDays(isoString, days * -1);

export const subtractMonths = (isoString, months) =>
  addMonths(isoString, months * -1);

export const subtractYears = (isoString, years) =>
  addYears(isoString, years * -1);
