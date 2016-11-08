import { assertThat, equalTo } from 'hamjest';
import { INVALID_DURATION } from '../constants';
import { normalize } from '../index';

describe('calculations', () => {
  describe('normalize', () => {
    it('PT61S results in PT1M1S', () => assertThat(
      normalize('PT61S'), equalTo('PT1M1S')));

    it('PT60.123S results in PT1M0.123S', () => assertThat(
      normalize('PT60.123S'), equalTo('PT1M0.123S')));

    it('PT61M results in PT1H1M', () => assertThat(
      normalize('PT61M'), equalTo('PT1H1M')));

    it('P1DT61M results in PT1H1M', () => assertThat(
      normalize('P1DT61M'), equalTo('P1DT1H1M')));

    it('`I\'m invalid` responds `INVALID_DURATION`', () => assertThat(
      normalize('I\'m invalid'), equalTo(INVALID_DURATION)));
  });
});
