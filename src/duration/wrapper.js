import {
  findSeconds,
  findMinutes,
  findHours,
  findDays,
  findWeeks,
  findMonths,
  findYears,

  asMicroseconds,
  asMilliseconds,
  asSeconds,
  asMinutes,
  asHours,

  addMicroseconds,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addDays,
  addHours,
  addWeeks,
  addMonths,
  addYears,

  subtractMilliseconds,
  subtractMicroseconds,
  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractWeeks,
  subtractMonths,
  subtractYears,

  toIso,
  toFragments,
} from './index';

export const fromFragments = (fragments) => {
  const isoString = toIso(fragments);
  return fromIso(isoString);
};

export const fromIso = (isoString) => {
  return {
    toIso: () => isoString,
    toFragments: () => toFragments(isoString),

    findSeconds: () => findSeconds(isoString),
    findMinutes: () => findMinutes(isoString),
    findHours: () => findHours(isoString),
    findDays: () => findDays(isoString),
    findWeeks: () => findWeeks(isoString),
    findMonths: () => findMonths(isoString),
    findYears: () => findYears(isoString),

    asMicroseconds: () => asMicroseconds(isoString),
    asMilliseconds: () => asMilliseconds(isoString),
    asSeconds: () => asSeconds(isoString),
    asMinutes: () => asMinutes(isoString),
    asHours: () => asHours(isoString),

    addMicroseconds: (amount) => fromIso(addMicroseconds(amount, isoString)),
    addMilliseconds: (amount) => fromIso(addMilliseconds(amount, isoString)),
    addSeconds: (amount) => fromIso(addSeconds(amount, isoString)),
    addMinutes: (amount) => fromIso(addMinutes(amount, isoString)),
    addHours: (amount) => fromIso(addHours(amount, isoString)),
    addDays: (amount) => fromIso(addDays(amount, isoString)),
    addWeeks: (amount) => fromIso(addWeeks(amount, isoString)),
    addMonths: (amount) => fromIso(addMonths(amount, isoString)),
    addYears: (amount) => fromIso(addYears(amount, isoString)),

    subtractMilliseconds: (amount) => fromIso(subtractMilliseconds(amount, isoString)),
    subtractMicroseconds: (amount) => fromIso(subtractMicroseconds(amount, isoString)),
    subtractSeconds: (amount) => fromIso(subtractSeconds(amount, isoString)),
    subtractMinutes: (amount) => fromIso(subtractMinutes(amount, isoString)),
    subtractHours: (amount) => fromIso(subtractHours(amount, isoString)),
    subtractDays: (amount) => fromIso(subtractDays(amount, isoString)),
    subtractWeeks: (amount) => fromIso(subtractWeeks(amount, isoString)),
    subtractMonths: (amount) => fromIso(subtractMonths(amount, isoString)),
    subtractYears: (amount) => fromIso(subtractYears(amount, isoString)),
  };
};
