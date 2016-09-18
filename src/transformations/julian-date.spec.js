import { assertThat, equalTo } from 'hamjest';
import { fromJulianDay, toJulianDay } from '../index';

// Test cases from https://www.wikiwand.com/de/Julianisches_Datum
const JULIAN_DAY_GREGORIAN_DAY = [
  { julianDay: 2299160.50, isoDate: '1582-10-15T00:00:00' },
  { julianDay: 2415020.50, isoDate: '1900-01-01T00:00:00' },
  { julianDay: 2447893.00, isoDate: '1990-01-01T12:00:00' },
  { julianDay: 2447893.25, isoDate: '1990-01-01T18:00:00' },
  { julianDay: 2451545, isoDate: '2000-01-01T12:00:00' },
  { julianDay: 2453750.1875, isoDate: '2006-01-14T16:30:00' },
  { julianDay: 2453820.1875, isoDate: '2006-03-25T16:30:00' },
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






