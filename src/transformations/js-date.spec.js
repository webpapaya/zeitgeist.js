import { assertThat, equalTo } from 'hamjest';
import { toJsDate, fromJsDate } from '../index';

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

describe('fromJsDate', () => {
  it('new Date("2000-10-20") results in "2000-10-20"', () => assertThat(
    fromJsDate(new Date('2000-10-20')), equalTo('2000-10-20T00:00:00.000Z')));
});

