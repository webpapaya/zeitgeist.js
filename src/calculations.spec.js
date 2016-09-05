import { toFragments, toIso, daysInMonth } from './index';

const addDays = (isoString, days) => {
  const fragments = toFragments(isoString);
  const calculatedDaysInMonth = daysInMonth(isoString);
  const daysLeftInMonth = calculatedDaysInMonth - fragments.day;

  if(daysLeftInMonth >= days) {
    return toIso({ ...fragments, day: fragments.day + days });
  }

  return toIso({
    ...fragments,
    month: fragments.month + 1,
    day: days - daysLeftInMonth
  });
};

import { assertThat, equalTo } from 'hamjest';

describe.only('addDays', () => {
  it('adding 1 day to 2000-01-01 results in 2000-01-02', () => assertThat(
    addDays('2000-01-01', 1), equalTo('2000-01-02')));

  it('adding 31 day to 2000-01-01 results in 2000-02-01', () => assertThat(
    addDays('2000-01-01', 31), equalTo('2000-02-01')));

  it('adding 1 day to 2000-01-31 results in 2000-02-01', () => assertThat(
    addDays('2000-01-31', 1), equalTo('2000-02-01')));

  it('adding 2 day to 2000-01-31 results in 2000-02-01', () => assertThat(
    addDays('2000-01-31', 2), equalTo('2000-02-02')));
});

