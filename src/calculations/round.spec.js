import { toIso, toFragments } from '../index';

const floorSeconds = (isoString) => {
  const fragments = toFragments(isoString);
  return toIso({ ...fragments, second: Math.floor(fragments.second) });
};

import { assertThat, equalTo } from 'hamjest';

describe.only('floorSeconds', () => {
  it('2000-01-01T11:12:13.123 results in 2000-01-01T11:12:13', () => assertThat(
    floorSeconds('2000-01-01T11:12:13.123'), equalTo('2000-01-01T11:12:13')));
});

