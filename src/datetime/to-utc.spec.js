import { assertThat, equalTo } from 'hamjest';
import toUtc from './to-utc';

describe('toUtc', () => {
  [
    { given: '2000-01-01T00:00:00+00:00', expected: '2000-01-01T00:00:00+00:00' },
    { given: '2000-01-01T01:00:00+01:00', expected: '2000-01-01T00:00:00+00:00' },
    // { given: '2000-01-01T01:00:00', expected: '2000-01-01T01:00:00' }, // TODO: specify how it should behave
  ].forEach(({ given, expected }) => {
    it(`${given} results in ${expected}`, () => {
      assertThat(toUtc(given), equalTo(expected));
    });
  });
});


