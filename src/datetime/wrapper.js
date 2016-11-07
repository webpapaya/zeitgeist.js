import {
  toFragments,

  addYears,
  addMonths,
  addDays,

  subtractYears,
  subtractMonths,
  subtractDays,
} from './index';

export const wrapper = (isoDatetime) => {
  return {
    toIso: () => isoDatetime,
    toFragments: () => toFragments(isoDatetime),

    addYears: (amount) => wrapper(addYears(amount, isoDatetime)),
    addMonths: (amount) => wrapper(addMonths(amount, isoDatetime)),
    addDays: (amount) => wrapper(addDays(amount, isoDatetime)),

    subtractYears: (amount) => wrapper(subtractYears(amount, isoDatetime)),
    subtractMonths: (amount) => wrapper(subtractMonths(amount, isoDatetime)),
    subtractDays: (amount) => wrapper(subtractDays(amount, isoDatetime)),
  };
};
