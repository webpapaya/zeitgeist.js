import {
  toFragments,

  addYears,
  addMonths,
  addDays,

  subtractYears,
  subtractMonths,
  subtractDays,
} from './index';

const wrapper = (isoString) => {
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

import { assertThat, not, throws, equalTo } from 'hamjest';

describe('Wrapper', () => {
  it('toFragments works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').toFragments(), not(throws())));

  it('toIso works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').toIso(), not(throws())));

  it('addYears works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').addYears(1), not(throws())));

  it('addMonths works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').addMonths(1), not(throws())));

  it('addDays works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').addDays(1), not(throws())));

  it('subtractYears works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').subtractYears(1), not(throws())));

  it('subtractMonths works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').subtractMonths(1), not(throws())));

  it('subtractDays works', () => assertThat(
    () => wrapper('2010-01-15T11:12:13.456').subtractDays(1), not(throws())));
});

