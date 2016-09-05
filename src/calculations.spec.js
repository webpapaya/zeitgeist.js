import { assertThat, equalTo, not, throws } from 'hamjest';
import { addDays } from './calculations';

describe.only('addDays', () => {
  it('adding 1 day to 2000-01-01 results in 2000-01-02', () => assertThat(
    addDays('2000-01-01', 1), equalTo('2000-01-02')));

  it('adding 31 days to 2000-01-01 results in 2000-02-01', () => assertThat(
    addDays('2000-01-01', 31), equalTo('2000-02-01')));

  it('adding 31 + 29 days to 2000-01-01 results in 2000-03-01', () => assertThat(
    addDays('2000-01-01', 60), equalTo('2000-03-01')));

  it('adding 1 day to 2000-01-31 results in 2000-02-01', () => assertThat(
    addDays('2000-01-31', 1), equalTo('2000-02-01')));

  it('adding 2 days to 2000-01-31 results in 2000-02-01', () => assertThat(
    addDays('2000-01-31', 2), equalTo('2000-02-02')));

  it('adding 365 days to 2000-01-01 results in 2001-01-01', () => assertThat(
    addDays('2000-01-01', 365), equalTo('2001-01-01')));
});

