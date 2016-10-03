import {
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from '../index';

export const subtractSeconds = (isoString, seconds) => addSeconds(isoString, seconds * -1);
export const subtractMinutes = (isoString, minutes) => addMinutes(isoString, minutes * -1);
export const subtractHours = (isoString, hours) => addHours(isoString, hours * -1);

export const subtractDays = (isoString, days) => addDays(isoString, days * -1);
export const subtractMonths = (isoString, months) => addMonths(isoString, months * -1);
export const subtractYears = (isoString, years) => addYears(isoString, years * -1);
