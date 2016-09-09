import { assertThat, equalTo } from 'hamjest';
import {
  isBetween,
  isSame,
  isBefore,
  isAfter,
  isSameOrAfter,
  isSameOrBefore,
} from './index';

describe('isSame', () => {
  it('2000-01-01 is NOT the same 2000-01-02', () => assertThat(
    isSame('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-01 is NOT the same 2000-01-01', () => assertThat(
    isSame('2000-01-01', '2000-01-01'), equalTo(true)));
});

describe('isBefore', () => {
  it('2000-01-01 is before 2000-01-02', () => assertThat(
    isBefore('2000-01-01', '2000-01-02'), equalTo(true)));

  it('2000-01-02 is NOT before 2000-01-01', () => assertThat(
    isBefore('2000-01-02', '2000-01-01'), equalTo(false)));

  it('T10:00 is before T11:00', () => assertThat(
    isBefore('T10:00', 'T11:00'), equalTo(true)));
});

describe('isSameOrBefore', () => {
  it('2000-01-01 is before 2000-01-02', () => assertThat(
    isSameOrBefore('2000-01-01', '2000-01-02'), equalTo(true)));

  it('2000-01-01 is equal to 2000-01-01', () => assertThat(
    isSameOrBefore('2000-01-01', '2000-01-01'), equalTo(true)));
});

describe('isAfter', () => {
  it('2000-01-01 is NOT after 2000-01-02', () => assertThat(
    isAfter('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-02 is before 2000-01-01', () => assertThat(
    isAfter('2000-01-02', '2000-01-01'), equalTo(true)));

  it('T10:00 is NOT after T11:00', () => assertThat(
    isAfter('T10:00', 'T11:00'), equalTo(false)));
});

describe('isSameOrBefore', () => {
  it('2000-01-01 is NOT after 2000-01-02', () => assertThat(
    isSameOrAfter('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-01 is equal to 2000-01-01', () => assertThat(
    isSameOrAfter('2000-01-01', '2000-01-01'), equalTo(true)));
});

describe('isBetween', () => {
  it('2000-01-02 is between 2000-01-01 and 2000-01-03', () => assertThat(
    isBetween('2000-01-02', { from: '2000-01-01', to: '2000-01-03' }), equalTo(true)));

  it('2000-01-04 is NOT between 2000-01-01 and 2000-01-03', () => assertThat(
    isBetween('2000-01-04', { from: '2000-01-01', to: '2000-01-03' }), equalTo(false)));

  it('T10:00 is between T09:00 and T10:00', () => assertThat(
    isBetween('T10:00', { from: 'T09:00', to: 'T10:00' }), equalTo(true)));
});
