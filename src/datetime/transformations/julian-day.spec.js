/* eslint-disable no-loop-func */
import { assertThat, equalTo } from 'hamjest';
import { toIso, fromJulianDay, toJulianDay } from '../index';

describe('fromJulianDay is the inverse function of toJulianDay', () => {
  const defaultFragments = { year: 2000, month: 1, day: 1, hour: 0, minute: 0, second: 0 };

  describe('years', () => {
    for (let year = 2000; year <= 2010; year++) {
      const isoDatetime = toIso({ ...defaultFragments, year });

      it(`${isoDatetime} works`, () => assertThat(
        fromJulianDay(toJulianDay(isoDatetime)), equalTo(isoDatetime)));
    }
  });

  describe('months', () => {
    for (let month = 1; month <= 12; month++) {
      const isoDatetime = toIso({ ...defaultFragments, month });

      it(`${isoDatetime} works`, () => assertThat(
        fromJulianDay(toJulianDay(isoDatetime)), equalTo(isoDatetime)));
    }
  });

  describe('days', () => {
    for (let day = 1; day <= 31; day++) {
      const isoDatetime = toIso({ ...defaultFragments, day });

      it(`${isoDatetime} works`, () => assertThat(
        fromJulianDay(toJulianDay(isoDatetime)), equalTo(isoDatetime)));
    }
  });

  describe('hours', () => {
    for (let hour = 0; hour < 24; hour++) {
      const isoDatetime = toIso({ ...defaultFragments, hour });

      it(`${isoDatetime} works`, () => assertThat(
        fromJulianDay(toJulianDay(isoDatetime)), equalTo(isoDatetime)));
    }
  });

  describe('minutes', () => {
    for (let minute = 0; minute < 60; minute++) {
      const isoDatetime = toIso({ ...defaultFragments, minute });
      it(`${isoDatetime} works`, () => assertThat(
        fromJulianDay(toJulianDay(isoDatetime)), equalTo(isoDatetime)));
    }
  });

  describe('seconds', () => {
    for (let second = 0; second < 60; second++) {
      const isoDatetime = toIso({ ...defaultFragments, second });
      it(`${isoDatetime} works`, () => assertThat(
        fromJulianDay(toJulianDay(isoDatetime)), equalTo(isoDatetime)));
    }
  });
});

// Test cases from https://www.wikiwand.com/de/Julianisches_Datum
const JULIAN_DAY_GREGORIAN_DAY = [
  { julianDay: 2299160.50, isoDate: '1582-10-15T00:00:00' },
  { julianDay: 2415020.50, isoDate: '1900-01-01T00:00:00' },
  { julianDay: 2447893.00, isoDate: '1990-01-01T12:00:00' },
  { julianDay: 2447893.25, isoDate: '1990-01-01T18:00:00' },
  { julianDay: 2451545, isoDate: '2000-01-01T12:00:00' },
  { julianDay: 2453750.1875, isoDate: '2006-01-14T16:30:00' },
  { julianDay: 2453820.1875, isoDate: '2006-03-25T16:30:00' },
  { julianDay: 2299160.500011574, isoDate: '1582-10-15T00:00:01' },
  { julianDay: 2453947.6556944447, isoDate: '2006-07-31T03:44:12' },
];

describe('julian date', () => {
  describe('toJulianDay', () => {
    JULIAN_DAY_GREGORIAN_DAY.forEach(({ julianDay, isoDate }) => {
      it(`ISO ${isoDate} is julian day ${julianDay}`, () => assertThat(
        toJulianDay(isoDate), equalTo(julianDay)));
    });
  });

  describe('fromJulianDay', () => {
    JULIAN_DAY_GREGORIAN_DAY.forEach(({ julianDay, isoDate }) => {
      it(`julian day ${julianDay} is ISO date ${isoDate}`, () => assertThat(
        fromJulianDay(julianDay), equalTo(isoDate)));
    });
  });
});
