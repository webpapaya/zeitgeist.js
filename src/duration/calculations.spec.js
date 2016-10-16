import { assertThat, equalTo } from 'hamjest';
import {
  addMicroseconds,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,

  subtractMilliseconds,
  subtractMicroseconds,
  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractWeeks,
  subtractMonths,
  subtractYears,

  normalize,
} from './calculations';

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
  });

  describe('add', () => {
    describe('milliseconds', () => {
      it('adding 1 millisecond to PT0S results in PT0.001S', () => assertThat(
        addMilliseconds(1, 'PT0S'), equalTo('PT0.001S')));

      it('can be curried', () => assertThat(
        addMilliseconds(1)('PT0S'), equalTo('PT0.001S')));
    });

    describe('microsecond', () => {
      it('adding 1 microsecond to PT0S results in PT0.000001S', () => assertThat(
        addMicroseconds(1, 'PT0S'), equalTo('PT0.000001S')));

      it('can be curried', () => assertThat(
        addMicroseconds(1)('PT0S'), equalTo('PT0.000001S')));
    });

    describe('seconds', () => {
      it('adding 1 second to PT0S results in PT1S', () => assertThat(
        addSeconds(1, 'PT0S'), equalTo('PT1S')));

      it('adding 61 second to PT0S results in PT61S', () => assertThat(
        addSeconds(61, 'PT0S'), equalTo('PT61S')));

      it('can be curried', () => assertThat(
        addSeconds(61)('PT0S'), equalTo('PT61S')));
    });

    describe('minutes', () => {
      it('adding 1 minute to PT0M results in PT1M', () => assertThat(
        addMinutes(1, 'PT0M'), equalTo('PT1M')));

      it('can be curried', () => assertThat(
        addMinutes(1)('PT0M'), equalTo('PT1M')));
    });

    describe('hours', () => {
      it('adding 1 minute to PT0H results in PT1H', () => assertThat(
        addHours(1, 'PT0H'), equalTo('PT1H')));

      it('can be curried', () => assertThat(
        addHours(1)('PT0H'), equalTo('PT1H')));
    });

    describe('days', () => {
      it('adding 1 day to P0D results in P1D', () => assertThat(
        addDays(1, 'P0D'), equalTo('P1D')));

      it('can be curried', () => assertThat(
        addDays(1)('P0D'), equalTo('P1D')));
    });

    describe('weeks', () => {
      it('adding 1 week to P0W results in P1W', () => assertThat(
        addWeeks(1, 'P0W'), equalTo('P1W')));

      it('can be curried', () => assertThat(
        addWeeks(1)('P0W'), equalTo('P1W')));
    });

    describe('months', () => {
      it('adding 1 week to P0M results in P0M', () => assertThat(
        addMonths(1, 'P0M'), equalTo('P1M')));

      it('can be curried', () => assertThat(
        addMonths(1)('P0M'), equalTo('P1M')));
    });

    describe('years', () => {
      it('adding 1 year to P0Y results in P1Y', () => assertThat(
        addYears(1, 'P0Y'), equalTo('P1Y')));

      it('can be curried', () => assertThat(
        addYears(1)('P0Y'), equalTo('P1Y')));
    });
  });

  describe('subtract', () => {
    describe('microsecond', () => {
      it('adding 1 microsecond from PT0S results in PT-0.000001S', () => assertThat(
        subtractMicroseconds(1, 'PT0S'), equalTo('PT-0.000001S')));

      it('can be curried', () => assertThat(
        subtractMicroseconds(1)('PT0S'), equalTo('PT-0.000001S')));
    });

    describe('milliseconds', () => {
      it('subtracting 1 millisecond from PT0S results in PT-0.001S', () => assertThat(
        subtractMilliseconds(1, 'PT0S'), equalTo('PT-0.001S')));

      it('can be curried', () => assertThat(
        subtractMilliseconds(1)('PT0S'), equalTo('PT-0.001S')));
    });

    describe('seconds', () => {
      it('subtracting 1 second from PT0S results in PT-1S', () => assertThat(
        subtractSeconds(1, 'PT0S'), equalTo('PT-1S')));

      it('subtracting 61 second from PT0S results in PT-61S', () => assertThat(
        subtractSeconds(61, 'PT0S'), equalTo('PT-61S')));

      it('can be curried', () => assertThat(
        subtractSeconds(61)('PT0S'), equalTo('PT-61S')));
    });

    describe('minutes', () => {
      it('subtracting 1 minute from PT0M results in PT-1M', () => assertThat(
        subtractMinutes(1, 'PT0M'), equalTo('PT-1M')));

      it('can be curried', () => assertThat(
        subtractMinutes(1)('PT0M'), equalTo('PT-1M')));
    });

    describe('hours', () => {
      it('subtracting 1 minute from PT0H results in PT-1H', () => assertThat(
        subtractHours(1, 'PT0H'), equalTo('PT-1H')));

      it('can be curried', () => assertThat(
        subtractHours(1)('PT0H'), equalTo('PT-1H')));
    });

    describe('days', () => {
      it('subtracting 1 day from P0D results in P-1D', () => assertThat(
        subtractDays(1, 'P0D'), equalTo('P-1D')));

      it('can be curried', () => assertThat(
        subtractDays(1)('P0D'), equalTo('P-1D')));
    });

    describe('weeks', () => {
      it('subtracting 1 week from P0W results in P-1W', () => assertThat(
        subtractWeeks(1, 'P0W'), equalTo('P-1W')));

      it('can be curried', () => assertThat(
        subtractWeeks(1)('P0W'), equalTo('P-1W')));
    });

    describe('months', () => {
      it('subtracting 1 month from P0M results in P-1M', () => assertThat(
        subtractMonths(1, 'P0M'), equalTo('P-1M')));

      it('can be curried', () => assertThat(
        subtractMonths(1)('P0M'), equalTo('P-1M')));
    });

    describe('years', () => {
      it('subtracting 1 year from P0Y results in P-1Y', () => assertThat(
        subtractYears(1, 'P0Y'), equalTo('P-1Y')));

      it('can be curried', () => assertThat(
        subtractYears(1)('P0Y'), equalTo('P-1Y')));
    });
  });
});
