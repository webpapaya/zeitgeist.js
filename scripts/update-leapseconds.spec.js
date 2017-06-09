import { readFileSync } from 'fs';
import { assertThat, equalTo } from 'hamjest';
import { readLeapSeconds } from './update-leapseconds';

describe('readLeapSeconds', () => {
  it('reads iana leapseconds file correctly', () => {
    const tzLeapSeconds = readFileSync('./scripts/_test-fixtures/leapseconds', 'utf8');
    const leapSecondsAsJson = readLeapSeconds(tzLeapSeconds);

    assertThat(leapSecondsAsJson['1972-06-30T23:59:60'], equalTo({ correction: 1 }));
  });
});

