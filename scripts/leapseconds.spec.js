import { readFileSync } from 'fs';
import { assertThat, equalTo } from 'hamjest';
import { readLeapSeconds } from './leapseconds';

describe('readLeapSeconds', () => {
  it('removes all comments', () => {
    const tzLeapSeconds = readFileSync('./scripts/_test-fixtures/leapseconds', 'utf8');
    const leapSecondsAsJson = readLeapSeconds(tzLeapSeconds);

    assertThat(leapSecondsAsJson['1972-06-30'], equalTo({ correction: 1, time: '23:59:60' }));
  });
});

