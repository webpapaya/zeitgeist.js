import { assertThat, equalTo } from 'hamjest';
import isValid from './is-valid';

describe('isValid', () => {
  [
    { isoDatetime: '2000', valid: true },
    { isoDatetime: '2000-10', valid: true },
    { isoDatetime: '2000-10-10', valid: true },
    { isoDatetime: '2000-01-02T03', valid: true },
    { isoDatetime: '2000-01-02T03:04', valid: true },
    { isoDatetime: '2000-01-02T03:04:05', valid: true },
    { isoDatetime: '2000-01-02T03:04:05.678', valid: true },

    { isoDatetime: '2000-01-02 03', valid: true },
    { isoDatetime: '2000-01-02 03:04', valid: true },
    { isoDatetime: '2000-01-02 03:04:05', valid: true },
    { isoDatetime: '2000-01-02 03:04:05.678', valid: true },
    { isoDatetime: '2000-01-02 03:04:05.678+09:10', valid: true },
    { isoDatetime: '2000-01-02 03:04:05.678Z', valid: true },
    { isoDatetime: '2000-01-02 03:04:05+09:10', valid: true },
    { isoDatetime: '2000-01-02 03:04:05-09:10', valid: true },
    { isoDatetime: '2000-01-02 03:04:05-09', valid: true },
    { isoDatetime: '2000-01-02 03:04-09', valid: true },
    { isoDatetime: '2000-01-02 03-09', valid: true },
    { isoDatetime: '2000-123', valid: true, description: 'as 123 months are added to 2000' },
    { isoDatetime: '2000-12-124', valid: true, description: 'as 124 days are added to 2000-12' },

    { isoDatetime: '', valid: false },
    { isoDatetime: 'Invalid Data', valid: false },
    { isoDatetime: '2xxx', valid: false },
    { isoDatetime: 'T10:00', valid: true },
  ].forEach(({ isoDatetime, valid, description = '' }) => {
    it(`"${isoDatetime}" is ${valid ? 'valid' : 'invalid'}, ${description}`, () => assertThat(
      isValid(isoDatetime), equalTo(valid)));
  });
});
