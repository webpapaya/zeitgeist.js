import { TIME_DESIGNATOR, DURATION_DESIGNATOR } from './constants';
const MATCH_YEAR = /(\d+Y)?/.source;
const MATCH_MONTH = /(\d+M)?/.source;
const MATCH_DAY = /(\d+D)?/.source;

const MATCH_HOUR = /(\d+H)?/.source;
const MATCH_MINUTE = /(\d+M)?/.source;
const MATCH_SECOND = /(\d+S)?/.source;

const MATCH_DATE = new RegExp(`${MATCH_YEAR}${MATCH_MONTH}${MATCH_DAY}`);
const MATCH_TIME = new RegExp(`(${TIME_DESIGNATOR}${MATCH_HOUR}${MATCH_MINUTE}${MATCH_SECOND})?`);

const isValid = (isoString) => {
  return new RegExp([
    '^',
    DURATION_DESIGNATOR,
    MATCH_DATE.source,
    MATCH_TIME.source,
    '$'
  ].join('')).test(isoString);
};

import { assertThat, equalTo } from 'hamjest';
describe.only('isValid iso8601 duration', () => {
  [
    { isoString: 'P1Y', valid: true },
    { isoString: 'P11Y', valid: true },
    { isoString: 'P1M', valid: true },
    { isoString: 'P11M', valid: true },
    { isoString: 'P1D', valid: true },
    { isoString: 'P11D', valid: true },
    { isoString: 'P1Y11D', valid: true },
    { isoString: 'PT1H', valid: true },
    { isoString: 'PT1M', valid: true },

    { isoString: 'P1H', valid: false },
    { isoString: 'P1S', valid: false },
    { isoString: 'P1Y11D1M', valid: false },
    { isoString: 'P11D1Y', valid: false},
    { isoString: '', valid: false },
    { isoString: 'Invalid Data', valid: false },
    { isoString: '2xxx', valid: false },
    { isoString: '2000-123', valid: false },
    { isoString: '2000-12-124', valid: false },
  ].forEach(({ isoString, valid }) => {
    it(`"${isoString}" is ${valid ? 'valid' : 'invalid'}`, () => assertThat(
      isValid(isoString), equalTo(valid)));
  });
});


