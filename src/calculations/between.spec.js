import { toFragments } from '../index';
const ONE_MICROSECOND = 1;
const ONE_MILLISECOND = 1000 * ONE_MICROSECOND;
const ONE_SECOND = 1000 * ONE_MILLISECOND;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

const UNITS = {
  hour: ONE_HOUR,
  minute: ONE_MINUTE,
  second: ONE_SECOND
};

const readUnit = (fragments, unit) => (fragments[unit] || 0);

const microsecondsBetween = (from, to) => {
  const fromAsFragments = toFragments(from);
  const toAsFragments = toFragments(to);

  return Object.keys(UNITS).reduce((totalSeconds, unit) => {
    const valueToBeAdded = readUnit(fromAsFragments, unit) - readUnit(toAsFragments, unit);
    const multiplier = UNITS[unit];
    return totalSeconds + ((valueToBeAdded * multiplier));
  }, 0);
};

const millisecondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_MILLISECOND;
const secondsBetween = (from, to) => microsecondsBetween(from, to) / ONE_SECOND;
const minutesBetween = (from, to) => microsecondsBetween(from, to) / ONE_MINUTE;
const hoursBetween = (from, to) => microsecondsBetween(from, to) / ONE_HOUR;

import { assertThat, equalTo } from 'hamjest';

describe('microsecondsBetween', () => {
  it('T10:01 and T10:00 is 60e6 microseconds', () => assertThat(
    microsecondsBetween('T10:01', 'T10:00'), equalTo(60e6)));
});

describe('millisecondsBetween', () => {
  it('T10:01 and T10:00 is 60e3 milliseconds', () => assertThat(
    millisecondsBetween('T10:01', 'T10:00'), equalTo(60e3)));
});

describe('secondsBetween', () => {
  it('seconds between T10:01 and T10:00 is 60 seconds', () => assertThat(
    secondsBetween('T10:01', 'T10:00'), equalTo(60)));

  it('seconds between T10:01 and T10:00:01 is 59 seconds', () => assertThat(
    secondsBetween('T10:01', 'T10:00:01'), equalTo(59)));

  it('seconds between T11:00 and T10:59:00 is 60 seconds', () => assertThat(
    secondsBetween('T11:00', 'T10:59'), equalTo(60)));
});

describe('minutes between', () => {
  it('T10:00 and T11:00 is 60 minutes', () => assertThat(
    minutesBetween('T11:00', 'T10:00'), equalTo(60)));
});

describe('hours between', () => {
  it('T10:00 and T11:00 is 1 hour ', () => assertThat(
    hoursBetween('T11:00', 'T10:00'), equalTo(1)));
});
