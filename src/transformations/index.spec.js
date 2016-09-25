import { assertThat, equalTo } from 'hamjest';
import {
  toIso,
  toFragments,
  toIsoDate,
  toIsoTime,
  removeTimeComponent,
  removeDateComponent,
  containsDateComponent,
  containsTimeComponent,
} from '../index';

const toJsDate = (isoStringOrFragments) => new Date(toIso(isoStringOrFragments));

describe('toJsDate', () => {
  it('{ year: 2000 }, works', () => assertThat(
    toJsDate({ year: 2000 }), equalTo(new Date('2000'))));

  it('"2000", works', () => assertThat(
    toJsDate('2000'), equalTo(new Date('2000'))));

  it('{ year: 2000, month: 10, day: 20 }, works', () => assertThat(
    toJsDate({ year: 2000, month: 10, day: 20 }), equalTo(new Date('2000-10-20'))));

  it('{ year: 2000, month: 9, day: 8, hour: 1, minute: 2, second: 3.4 }, works', () => assertThat(
    toJsDate({
      year: 2000,
      month: 9,
      day: 8,
      hour: 1,
      minute: 2,
      second: 3.4,
    }), equalTo(new Date('2000-09-08T01:02:03.4'))));
});

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

describe('toFragments', () => {
  describe('`2000` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000').year, equalTo(2000)));

    it('month undefined', () => assertThat(
      toFragments('2000').month, equalTo(void 0)));

    it('day undefined', () => assertThat(
      toFragments('2000').day, equalTo(void 0)));

    it('hour undefined', () => assertThat(
      toFragments('2000').hour, equalTo(void 0)));

    it('minute undefined', () => assertThat(
      toFragments('2000').minute, equalTo(void 0)));

    it('second undefined', () => assertThat(
      toFragments('2000').second, equalTo(void 0)));
  });

  describe('`2000-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01').month, equalTo(1)));

    it('day undefined', () => assertThat(
      toFragments('2000-01').day, equalTo(void 0)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      toFragments('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      toFragments('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01T10:20:30.123` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123').minute, equalTo(20)));

    it('`second is 30.123`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123').second, equalTo(30.123)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is undefined`', () => assertThat(
      toFragments('2000-01-01 10:20').second, equalTo(void 0)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is undefined`', () => assertThat(
      toFragments('2000-01-01 10:20').second, equalTo(void 0)));
  });

  describe('`T20:15` responds', () => {
    it('`hour` is 20', () => assertThat(
      toFragments('T20:15').hour, equalTo(20)));

    it('`minute` is 15', () => assertThat(
      toFragments('T20:15').minute, equalTo(15)));

    it('`second` is undefined', () => assertThat(
      toFragments('T20:15').second, equalTo(void 0)));
  });
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
