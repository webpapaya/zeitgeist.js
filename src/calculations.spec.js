import { toFragments, toIso } from './index';

const addDays = (isoString, days) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, day: fragments.day + days });
};

import { assertThat, equalTo } from 'hamjest';

describe('addDays', () => {
  it('adding 1 day to 2000-01-01 results in 2000-01-02', () => assertThat(
    addDays('2000-01-01', 1), equalTo('2000-01-02')));
});

