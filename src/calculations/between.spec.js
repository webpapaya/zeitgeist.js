import { assertThat, equalTo } from 'hamjest';
import {
  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,
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
});

describe('minutes between', () => {
  it('T10:00 and T11:00 is 60 minutes', () => assertThat(
    minutesBetween('T11:00', 'T10:00'), equalTo(60)));
});

describe('hours between', () => {
  it('T10:00 and T11:00 is 1 hour ', () => assertThat(
    hoursBetween('T11:00', 'T10:00'), equalTo(1)));
});
