import { assertThat, equalTo } from 'hamjest';
import {
  isBefore,
  isAfter,
  isAfterOrEqual,
  isBeforeOrEqual
} from './index';

describe('isBefore', () => {
  it('2000-01-01 is before 2000-01-02', () => assertThat(
    isBefore('2000-01-01', '2000-01-02'), equalTo(true)));

  it('2000-01-02 is NOT before 2000-01-01', () => assertThat(
    isBefore('2000-01-02', '2000-01-01'), equalTo(false)));

  it('T10:00 is before T11:00', () => assertThat(
    isBefore('T10:00', 'T11:00'), equalTo(true)));
});

describe('isBeforeOrEqual', () => {
  it('2000-01-01 is before 2000-01-02', () => assertThat(
    isBeforeOrEqual('2000-01-01', '2000-01-02'), equalTo(true)));

  it('2000-01-01 is equal to 2000-01-01', () => assertThat(
    isBeforeOrEqual('2000-01-01', '2000-01-01'), equalTo(true)));
});

describe('isAfter', () => {
  it('2000-01-01 is NOT after 2000-01-02', () => assertThat(
    isAfter('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-02 is before 2000-01-01', () => assertThat(
    isAfter('2000-01-02', '2000-01-01'), equalTo(true)));

  it('T10:00 is NOT after T11:00', () => assertThat(
    isAfter('T10:00', 'T11:00'), equalTo(false)));
});

describe('isBeforeOrEqual', () => {
  it('2000-01-01 is NOT after 2000-01-02', () => assertThat(
    isAfterOrEqual('2000-01-01', '2000-01-02'), equalTo(false)));

  it('2000-01-01 is equal to 2000-01-01', () => assertThat(
    isAfterOrEqual('2000-01-01', '2000-01-01'), equalTo(true)));
});
