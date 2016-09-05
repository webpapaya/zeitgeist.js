import { assertThat, equalTo } from 'hamjest';
import { toIso, toFragments } from './index';

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

describe('toFragments', () => {
  describe('`2000` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000').month, equalTo(1)));

    it('day 1', () => assertThat(
      toFragments('2000').day, equalTo(1)));

    it('hour 0', () => assertThat(
      toFragments('2000').hour, equalTo(0)));

    it('minute 0', () => assertThat(
      toFragments('2000').minute, equalTo(0)));

    it('second 0', () => assertThat(
      toFragments('2000').second, equalTo(0)));
  });

  describe('`2000-01` responds', () => {
    it('year 2000', () => assertThat(
      toFragments('2000-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      toFragments('2000-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      toFragments('2000-01').day, equalTo(1)));
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

    it('`second is 0`', () => assertThat(
      toFragments('2000-01-01T10:20:30.123').second, equalTo(30.123)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      toFragments('2000-01-01 10:20').second, equalTo(0)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      toFragments('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      toFragments('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      toFragments('2000-01-01 10:20').second, equalTo(0)));
  });
});
