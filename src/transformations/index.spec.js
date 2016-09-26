import { assertThat, equalTo } from 'hamjest';
import {
  toIso,
  toIsoDate,
  toIsoTime,
  removeTimeComponent,
  removeDateComponent,
  containsDateComponent,
  containsTimeComponent,
} from '../index';

describe('toIso', () => {
  it('{} => ""', () => assertThat(
    toIso({ }), equalTo('')));

  it('{ year: 2000 } => 2000', () => assertThat(
    toIso({ year: 2000 }), equalTo('2000')));

  it('{ year: 2000, month: 2 } => 2000-02', () => assertThat(
    toIso({ year: 2000, month: 2 }), equalTo('2000-02')));

  it('{ year: 2000, month: 10 } => 2000-02', () => assertThat(
    toIso({ year: 2000, month: 10 }), equalTo('2000-10')));

  it('{ year: 2000, month: 10, day: 20 } => 2000-02-20', () => assertThat(
    toIso({ year: 2000, month: 10, day: 20 }), equalTo('2000-10-20')));

  it('{ year: 2000, day: 20 } => 2000', () => assertThat(
    toIso({ year: 2000, day: 20 }), equalTo('2000')));

  it('{ hour: 10 } => 10', () => assertThat(
    toIso({ hour: 10 }), equalTo('10')));

  it('{ hour: 10, minute: 20 } => 10:20', () => assertThat(
    toIso({ hour: 10, minute: 20 }), equalTo('10:20')));

  it('{ hour: 10, minute: 20, second: 1 } => 10:20:01', () => assertThat(
    toIso({ hour: 10, minute: 20, second: 1 }), equalTo('10:20:01')));

  it('{ hour: 10, second: 1 } => 10', () => assertThat(
    toIso({ hour: 10, second: 1 }), equalTo('10')));
});

describe('toIsoDate', () => {
  it('{ year: 2000, month: 10, day: 20, hour: 10 }', () => assertThat(
    toIsoDate({ year: 2000, month: 10, day: 20, hour: 10 }), equalTo('2000-10-20')));
});

describe('toIsoTime', () => {
  it('{ year: 2000, month: 10, day: 20, hour: 10 }', () => assertThat(
    toIsoTime({ year: 2000, hour: 10, minute: 1 }), equalTo('10:01')));
});

describe('removeTimeComponent', () => {
  it('2000-01-01T10:00 responds 2000-01-01', () => assertThat(
    removeTimeComponent('2000-01-01T10:00'), equalTo('2000-01-01')));

  it('T10:00 responds empty string', () => assertThat(
    removeTimeComponent('T10:00'), equalTo('')));
});

describe('removeDateComponent', () => {
  it('2000-01-01T10:00 responds 10:00', () => assertThat(
    removeDateComponent('2000-01-01T10:00'), equalTo('10:00')));

  it('2000-01-01 responds empty string', () => assertThat(
    removeDateComponent('2000-01-01'), equalTo('')));
});

describe('containsDateComponent', () => {
  it('true for 2000-01-01T10:00', () => assertThat(
    containsDateComponent('2000-01-01T10:00'), equalTo(true)));

  it('true for 2000-01-01', () => assertThat(
    containsDateComponent('2000-01-01'), equalTo(true)));

  it('false for T10:00', () => assertThat(
    containsDateComponent('T10:00'), equalTo(false)));

  it('false for empty string', () => assertThat(
    containsDateComponent(''), equalTo(false)));
});

describe('containsTimeComponent', () => {
  it('true for 2000-01-01T10:00', () => assertThat(
    containsTimeComponent('2000-01-01T10:00'), equalTo(true)));

  it('false for 2000-01-01', () => assertThat(
    containsTimeComponent('2000-01-01'), equalTo(false)));

  it('true for T10:00', () => assertThat(
    containsTimeComponent('T10:00'), equalTo(true)));

  it('false for empty string', () => assertThat(
    containsTimeComponent(''), equalTo(false)));
});
