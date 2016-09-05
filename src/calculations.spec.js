import { toFragments, toIso, daysInMonth } from './index';

const addDays = (isoString, days) => {
  const fragments = toFragments(isoString);
  const daysAmount = daysInMonth(isoString);
  console.log(daysAmount)

  return toIso({ ...fragments, day: fragments.day + days });
};

import { assertThat, equalTo } from 'hamjest';

describe.skip('addDays', () => {
  it('adding 1 day to 2000-01-01 results in 2000-01-02', () => assertThat(
    addDays('2000-01-01', 1), equalTo('2000-01-02')));

  it('adding 1 day to 2000-01-31 results in 2000-02-01', () => assertThat(
    addDays('2000-01-31', 1), equalTo('2000-02-01')));
});

