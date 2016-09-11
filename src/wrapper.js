import {
  toFragments,

  addYears,
  addMonths,
  addDays,

  subtractYears,
  subtractMonths,
  subtractDays,
} from './index';

export const wrapper = (isoString) => {
  return {
    toIso: () => isoString,
    toFragments: () => toFragments(isoString),

    addYears: (amount) => wrapper(addYears(isoString, amount)),
    addMonths: (amount) => wrapper(addMonths(isoString, amount)),
    addDays: (amount) => wrapper(addDays(isoString, amount)),

    subtractYears: (amount) => wrapper(subtractYears(isoString, amount)),
    subtractMonths: (amount) => wrapper(subtractMonths(isoString, amount)),
    subtractDays: (amount) => wrapper(subtractDays(isoString, amount)),
  }
};
