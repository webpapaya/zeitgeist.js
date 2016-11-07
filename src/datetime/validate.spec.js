import { assertThat, equalTo } from 'hamjest';
import {
  isValid,
  validateFirstArg,
  validateFirstAndSecondArg,
} from './validate';

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
  ].forEach(({ isoDatetime, valid, description = '' }) => {
    it(`"${isoDatetime}" is ${valid ? 'valid' : 'invalid'}, ${description}`, () => assertThat(
      isValid(isoDatetime), equalTo(valid)));
  });
});


describe('validateFirstArg', () => {
  const validatedFn = validateFirstArg((value) => value);

  it('validatedFn responds given value when valid', () => assertThat(
    validatedFn('2000-01-01'), equalTo('2000-01-01')));

  it('validatedFn responds `Invalid Format` when invalid', () => assertThat(
    validatedFn('xxxx'), equalTo('Invalid Date')));
});


describe('validateFirstAndSecondArg', () => {
  const validatedFn = validateFirstAndSecondArg((first, second) => [first, second]);

  it('validatedFn responds given value when valid', () => assertThat(
    validatedFn('2000-01', '2000-01'), equalTo(['2000-01', '2000-01'])));

  it('validatedFn responds `Invalid Format` when invalid', () => assertThat(
    validatedFn('xxxx', '2000-01'), equalTo(['Invalid Date', '2000-01'])));
});

