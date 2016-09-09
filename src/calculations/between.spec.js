import { assertThat, equalTo, not, throws } from 'hamjest';
import {
  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,
  datesBetween,
  daysBetween,
} from '../index';

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

  it('there are 60 seconds between 2000-01-02T00:00 and 2000-01-01T23:59', () => assertThat(
    secondsBetween('2000-01-02T00:00', '2000-01-01T23:59'), equalTo(60)));

  it.skip('there are -60 seconds between 2000-01-01T23:59 and 2000-01-02T00:00', () => assertThat(
    secondsBetween('2000-01-01T23:59', '2000-01-02T00:00'), equalTo(60)));
});

describe('minutes between', () => {
  it('T10:00 and T11:00 is 60 minutes', () => assertThat(
    minutesBetween('T11:00', 'T10:00'), equalTo(60)));
});

describe('hours between', () => {
  it('T10:00 and T11:00 is 1 hour ', () => assertThat(
    hoursBetween('T11:00', 'T10:00'), equalTo(1)));
});

describe('daysBetween responds', () => {
  it('0 days between 2000-01-01 and 2000-01-01', () => assertThat(
    daysBetween('2000-01-01', '2000-01-01'), equalTo(0)));

  it('1 days between 2000-01-01 and 2000-01-02', () => assertThat(
    daysBetween('2000-01-01', '2000-01-02'), equalTo(1)));

  it('-1 day between 2001-01-01 and 2000-12-31', () => assertThat(
    daysBetween('2001-01-01', '2000-12-31'), equalTo(-1)));

  it('1 day between 2000-12-31 and 2001-01-01', () => assertThat(
    daysBetween('2000-12-31', '2001-01-01'), equalTo(1)));

  it('1 days between 2000-01-02 and 2000-01-01', () => assertThat(
    daysBetween('2000-01-02', '2000-01-01'), equalTo(-1)));

  it('366 days between a leap year and a regular year', () => assertThat(
    daysBetween('2000-01-01', '2001-01-01'), equalTo(366)));

  it('365 days between two regular years', () => assertThat(
    daysBetween('2001-01-01', '2002-01-01'), equalTo(365)));
});

describe('dates between', () => {
  it('dates between 2000-01-01 and 2000-01-02 responds correct dates', () => assertThat(
    datesBetween('2000-01-01', '2000-01-02'), equalTo(['2000-01-01', '2000-01-02'])));

  it('dates between 2000-01-01T10:10 and 2000-01-02 responds correct dates', () => assertThat(
    datesBetween('2000-01-01T10:10', '2000-01-02'), equalTo(['2000-01-01', '2000-01-02'])));

  it('dates between 2000-01-02 and 2000-01-01 responds correct dates', () => assertThat(
    datesBetween('2000-01-02', '2000-01-01'), equalTo(['2000-01-02', '2000-01-01'])));

  it('dates between 2000-01-03 and 2000-01-01 responds correct dates', () => assertThat(
    datesBetween('2000-01-03', '2000-01-01'), equalTo([
      '2000-01-03',
      '2000-01-02',
      '2000-01-01',
    ])));

  it('dates between two empty strings is an empty array', () => assertThat(
    datesBetween('', ''), equalTo([])));

  it('dates between T10:00 and T11:00 is an empty array', () => assertThat(
    datesBetween('T10:00', 'T11:00'), equalTo([])));

  it('tail call optimisation works', () => assertThat(
    () => datesBetween('2000-01-01', '2015-01-01'), not(throws())));
});
