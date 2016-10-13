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

    addYears: (amount) => wrapper(addYears(amount, isoString)),
    addMonths: (amount) => wrapper(addMonths(amount, isoString)),
    addDays: (amount) => wrapper(addDays(amount, isoString)),

    subtractYears: (amount) => wrapper(subtractYears(amount, isoString)),
    subtractMonths: (amount) => wrapper(subtractMonths(amount, isoString)),
    subtractDays: (amount) => wrapper(subtractDays(amount, isoString)),
  };
};
