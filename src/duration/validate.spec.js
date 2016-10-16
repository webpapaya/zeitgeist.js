import { assertThat, equalTo } from 'hamjest';
import { isValid } from './validate';

describe('isValid iso8601 duration', () => {
  [
    { isoString: 'P1y', valid: true },
    { isoString: 'P1Y', valid: true },
    { isoString: 'P1.5Y', valid: true },
    { isoString: 'P11Y', valid: true },
    { isoString: 'P11Y1W', valid: true },
    { isoString: 'P1M', valid: true },
    { isoString: 'P1.5M', valid: true },
    { isoString: 'P11M', valid: true },
    { isoString: 'P1W', valid: true },
    { isoString: 'P1.5W', valid: true },
    { isoString: 'P1D', valid: true },
    { isoString: 'P1.5D', valid: true },
    { isoString: 'P11D', valid: true },
    { isoString: 'P1Y11D', valid: true },
    { isoString: 'PT1H', valid: true },
    { isoString: 'PT1M', valid: true },
    { isoString: 'P3Y6M1W4DT12H30M17.5S', valid: true },

    { isoString: 'PT-1S', valid: true },
    { isoString: 'PT+1S', valid: true },

    { isoString: 'P1H', valid: false },
    { isoString: 'P1S', valid: false },
    { isoString: 'P1Y11D1M', valid: false },
    { isoString: 'P11D1Y', valid: false },
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
