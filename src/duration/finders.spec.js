import { assertThat, equalTo } from 'hamjest';

import {
  findYears,
  findMonths,
  findWeeks,
  findDays,
  findHours,
  findMinutes,
  findSeconds,

  removeDateComponent,
  removeTimeComponent,
} from './finders';

describe('removeDateComponent', () => {
  it('P1DT1M results in PT1M', () => assertThat(
    removeDateComponent('P1DT1M'), equalTo('PT1M')));

  it('P1D results in PT', () => assertThat(
    removeDateComponent('PT'), equalTo('PT')));
});

describe('removeTimeComponent', () => {
  it('P1DT1M results in P1D', () => assertThat(
    removeTimeComponent('P1DT1M'), equalTo('P1D')));

  it('PT results in P', () => assertThat(
    removeTimeComponent('PT'), equalTo('P')));
});

describe('unit finders for P3Y6M1W4DT12H30M17.5S', () => {
  it('finds 3 years', () => assertThat(
    findYears('P3Y6M1W4DT12H30M17.5S'), equalTo(3)));

  it('finds 6 months', () => assertThat(
    findMonths('P3Y6M1W4DT12H30M17.5S'), equalTo(6)));

  it('finds 4 days', () => assertThat(
    findDays('P3Y6M1W4DT12H30M17.5S'), equalTo(4)));

  it('finds 1 week', () => assertThat(
    findWeeks('P3Y6M1W4DT12H30M17.5S'), equalTo(1)));

  it('finds 12 hours', () => assertThat(
    findHours('P3Y6M1W4DT12H30M17.5S'), equalTo(12)));

  it('finds 12 minutes', () => assertThat(
    findMinutes('P3Y6M1W4DT12H30M17.5S'), equalTo(30)));

  it('finds 17.5 seconds', () => assertThat(
    findSeconds('P3Y6M1W4DT12H30M17.5S'), equalTo(17.5)));
});
