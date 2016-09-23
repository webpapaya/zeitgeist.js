import { assertThat, not, throws } from 'hamjest';
import { wrapper } from './wrapper';

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
