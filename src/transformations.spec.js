import { assertThat, equalTo } from 'hamjest';
import { toIso } from './index';

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
