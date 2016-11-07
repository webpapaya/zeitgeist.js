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
  const isoDuration = toIso(fragments);
  return fromIso(isoDuration);
};

export const fromIso = (isoDuration) => {
  return {
    toIso: () => isoDuration,
    toFragments: () => toFragments(isoDuration),

    findSeconds: () => findSeconds(isoDuration),
    findMinutes: () => findMinutes(isoDuration),
    findHours: () => findHours(isoDuration),
    findDays: () => findDays(isoDuration),
    findWeeks: () => findWeeks(isoDuration),
    findMonths: () => findMonths(isoDuration),
    findYears: () => findYears(isoDuration),

    asMicroseconds: () => asMicroseconds(isoDuration),
    asMilliseconds: () => asMilliseconds(isoDuration),
    asSeconds: () => asSeconds(isoDuration),
    asMinutes: () => asMinutes(isoDuration),
    asHours: () => asHours(isoDuration),

    addMicroseconds: (amount) => fromIso(addMicroseconds(amount, isoDuration)),
    addMilliseconds: (amount) => fromIso(addMilliseconds(amount, isoDuration)),
    addSeconds: (amount) => fromIso(addSeconds(amount, isoDuration)),
    addMinutes: (amount) => fromIso(addMinutes(amount, isoDuration)),
    addHours: (amount) => fromIso(addHours(amount, isoDuration)),
    addDays: (amount) => fromIso(addDays(amount, isoDuration)),
    addWeeks: (amount) => fromIso(addWeeks(amount, isoDuration)),
    addMonths: (amount) => fromIso(addMonths(amount, isoDuration)),
    addYears: (amount) => fromIso(addYears(amount, isoDuration)),

    subtractMilliseconds: (amount) => fromIso(subtractMilliseconds(amount, isoDuration)),
    subtractMicroseconds: (amount) => fromIso(subtractMicroseconds(amount, isoDuration)),
    subtractSeconds: (amount) => fromIso(subtractSeconds(amount, isoDuration)),
    subtractMinutes: (amount) => fromIso(subtractMinutes(amount, isoDuration)),
    subtractHours: (amount) => fromIso(subtractHours(amount, isoDuration)),
    subtractDays: (amount) => fromIso(subtractDays(amount, isoDuration)),
    subtractWeeks: (amount) => fromIso(subtractWeeks(amount, isoDuration)),
    subtractMonths: (amount) => fromIso(subtractMonths(amount, isoDuration)),
    subtractYears: (amount) => fromIso(subtractYears(amount, isoDuration)),
  };
};
