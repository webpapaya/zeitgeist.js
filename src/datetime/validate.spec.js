import { assertThat, equalTo } from 'hamjest';
import {
  isValid,
  validateFirstArg,
  validateFirstAndSecondArg,
} from './validate';

describe('isValid', () => {
  [
    { isoString: '2000', valid: true },
    { isoString: '2000-10', valid: true },
    { isoString: '2000-10-10', valid: true },
    { isoString: '2000-01-02T03', valid: true },
    { isoString: '2000-01-02T03:04', valid: true },
    { isoString: '2000-01-02T03:04:05', valid: true },
    { isoString: '2000-01-02T03:04:05.678', valid: true },

    { isoString: '2000-01-02 03', valid: true },
    { isoString: '2000-01-02 03:04', valid: true },
    { isoString: '2000-01-02 03:04:05', valid: true },
    { isoString: '2000-01-02 03:04:05.678', valid: true },
    { isoString: '2000-01-02 03:04:05.678+09:10', valid: true },
    { isoString: '2000-01-02 03:04:05.678Z', valid: true },
    { isoString: '2000-01-02 03:04:05+09:10', valid: true },
    { isoString: '2000-01-02 03:04:05-09:10', valid: true },
    { isoString: '2000-01-02 03:04:05-09', valid: true },
    { isoString: '2000-01-02 03:04-09', valid: true },
    { isoString: '2000-01-02 03-09', valid: true },

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


describe('validateFirstArg', () => {
  const validatedFn = validateFirstArg((value) => value);

  it('validatedFn responds given value when valid', () => assertThat(
    validatedFn('2000-01-01'), equalTo('2000-01-01')));

  it('validatedFn responds `Invalid Format` when invalid', () => assertThat(
    validatedFn('xxxx'), equalTo('Invalid Format')));
});


describe('validateFirstAndSecondArg', () => {
  const validatedFn = validateFirstAndSecondArg((first, second) => [first, second]);

  it('validatedFn responds given value when valid', () => assertThat(
    validatedFn('2000-01', '2000-01'), equalTo(['2000-01', '2000-01'])));

  it('validatedFn responds `Invalid Format` when invalid', () => assertThat(
    validatedFn('xxxx', '2000-01'), equalTo(['Invalid Format', '2000-01'])));
});

