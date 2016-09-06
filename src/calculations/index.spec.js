import { assertThat, equalTo, not, throws } from 'hamjest';
import { addDays, subtractDays, addMonths } from '../index';

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
});

describe('addMonths', () => {
  it('adding 1 month to 2000-01-01 results in 2000-02-01', () => assertThat(
    addMonths('2000-01-01', 1), equalTo('2000-02-01')));

  it('adding 12 months to 2000-01-01 results in 2001-01-01', () => assertThat(
    addMonths('2000-01-01', 12), equalTo('2001-01-01')));

  it('adding 24 months to 2000-01-01 results in 2002-01-01', () => assertThat(
    addMonths('2000-01-01', 24), equalTo('2002-01-01')));
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
