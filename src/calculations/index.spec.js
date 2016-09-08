import { assertThat, equalTo, not, throws } from 'hamjest';
import { getCallStackSize } from '../test-helper';
import {
  addDays,
  addMonths,
  addYears,

  subtractDays,
  subtractMonths,
  subtractYears,
} from '../index';

describe('addDays', () => {
  it('adding 1 day to 2000-01-01 results in 2000-01-02', () => assertThat(
    addDays('2000-01-01', 1), equalTo('2000-01-02')));

  it('adding 31 days to 2000-01-01 results in 2000-02-01', () => assertThat(
    addDays('2000-01-01', 31), equalTo('2000-02-01')));

  it('adding 31 + 29 days to 2000-01-01 results in 2000-03-01', () => assertThat(
    addDays('2000-01-01', 60), equalTo('2000-03-01')));

  it('adding 1 day to 2000-01-31 results in 2000-02-01', () => assertThat(
    addDays('2000-01-31', 1), equalTo('2000-02-01')));

  it('adding 2 days to 2000-01-31 results in 2000-02-02', () => assertThat(
    addDays('2000-01-31', 2), equalTo('2000-02-02')));

  it('adding 365 days to 2000-01-01 results in 2001-01-01', () => assertThat(
    addDays('2000-01-01', 365), equalTo('2001-01-01')));

  it('adding -1 day to 2001-01-01 results in 2000-12-31', () => assertThat(
    addDays('2001-01-01', -1), equalTo('2000-12-31')));

  it('tail call optimisation works', () => assertThat(
    () => addDays('2000-01-01', getCallStackSize() + 1), not(throws())));


});

describe('addMonths', () => {
  it('adding 1 month to 2000-01-01 results in 2000-02-01', () => assertThat(
    addMonths('2000-01-01', 1), equalTo('2000-02-01')));

  it('adding 12 months to 2000-01-01 results in 2001-01-01', () => assertThat(
    addMonths('2000-01-01', 12), equalTo('2001-01-01')));

  it('adding 24 months to 2000-01-01 results in 2002-01-01', () => assertThat(
    addMonths('2000-01-02', 24), equalTo('2002-01-02')));

  it('adding -1 months to 2000-02-01 results in 2000-01-01', () => assertThat(
    addMonths('2000-02-01', -1), equalTo('2000-01-01')));

  it('tail call optimisation works', () => assertThat(
    () => addMonths('2000-01-01', getCallStackSize() + 1), not(throws())));
});

describe('addYears', () => {
  it('adding 1 year to 2000-01-01 results in 2001-01-01', () => assertThat(
    addYears('2000-01-01', 1), equalTo('2001-01-01')));

  it('adding 10 year to 2000-01-01 results in 2010-01-01', () => assertThat(
    addYears('2000-01-01', 10), equalTo('2010-01-01')));

  it('add -1 years to 2001-01-01 results in 2000-01-01', () => assertThat(
    addYears('2001-01-01', -1), equalTo('2000-01-01')));

  it('tail call optimisation works', () => assertThat(
    () => addYears('2000-01-01', getCallStackSize() + 1), not(throws())));
});

describe('subtractDays', () => {
  it('subtract 1 day from 2000-01-02 results in 2000-01-01', () => assertThat(
    subtractDays('2000-01-02', 1), equalTo('2000-01-01')));

  it('subtract 31 days from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractDays('2000-02-01', 31), equalTo('2000-01-01')));

  it('subtract 31 + 29 days from 2000-03-01 results in 2000-01-01', () => assertThat(
    subtractDays('2000-03-01', 60), equalTo('2000-01-01')));

  it('subtract 1 day from 2001-01-01 results in 2000-12-31', () => assertThat(
    subtractDays('2001-01-01', 1), equalTo('2000-12-31')));

  it('subtract 2 days from 2000-02-02 results in 2000-01-31', () => assertThat(
    subtractDays('2000-02-02', 2), equalTo('2000-01-31')));

  it('subtract 365 days from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractDays('2001-01-01', 365), equalTo('2000-01-01')));

  it('subtract -1 day from 2000-12-31 results in 2001-01-01', () => assertThat(
    subtractDays('2000-12-31', -1), equalTo('2001-01-01')));
});

describe('subtract months', () => {
  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths('2000-02-01', 1), equalTo('2000-01-01')));

  it('subtract 1 month from 2000-02-01 results in 2000-01-01', () => assertThat(
    subtractMonths('2001-01-01', 1), equalTo('2000-12-01')));

  it('subtract -1 month from 2000-01-01 results in 2000-02-01', () => assertThat(
    subtractMonths('2000-01-01', -1), equalTo('2000-02-01')));
});

describe('subtractYears', () => {
  it('subtract 1 year from 2001-01-01 results in 2000-01-01', () => assertThat(
    subtractYears('2001-01-01', 1), equalTo('2000-01-01')));

  it('adding 10 year to 2010-01-01 results in 2000-01-01', () => assertThat(
    subtractYears('2010-01-01', 10), equalTo('2000-01-01')));

  it('subtract -1 years from 2000-01-01 results in 2001-01-01', () => assertThat(
    subtractYears('2000-01-01', -1), equalTo('2001-01-01')));
});
