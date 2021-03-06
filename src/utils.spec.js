import { assertThat, equalTo } from 'hamjest';
import {
  buildCollectionMonad,
  buildMaybeMonad,
  leftPad,
  fractionOfNumber,
  compose,
} from './utils';

describe('compose', () => {
  it('responds a new fn', () => {
    const first = (input) => `${input }First`;
    const second = (input) => `${input }Second`;
    const composed = compose(first, second);

    assertThat(composed('init'), equalTo(second(first('init'))));
  });
});

describe('maybeMonad', () => {
  describe('with a regular value', () => {
    it('value can be mapped', () => buildMaybeMonad('test')
      .map((value) => value.toUpperCase())
      .map((value) => assertThat(value, equalTo('TEST'))));

    it('value can be mapped multiple times', () => buildMaybeMonad('test')
      .map((value) => value.toUpperCase())
      .map((value) => `${value}!!!`)
      .map((value) => assertThat(value, equalTo('TEST!!!'))));

    it('chain works', () => buildMaybeMonad('test')
      .chain((value) => buildMaybeMonad(value.toUpperCase()))
      .map((value) => assertThat(value, equalTo('TEST'))));

    it('toValue from 0 responds 0', () => buildMaybeMonad(void 0)
      .setIfBlank('value')
      .value((value) => assertThat(value, equalTo('value'))));
  });
});

describe('collection monad', () => {
  describe('build', () => {
    it('can be built with a single value', () => {
      buildCollectionMonad(['test1'])
        .value((result) => assertThat(result, equalTo(['test1'])));
    });

    it('can be built with a multiple values', () => {
      buildCollectionMonad(['test1'], ['test2'])
        .value((result) => assertThat(result, equalTo(['test1', 'test2'])));
    });

    it('lifts a string to a collection', () => {
      buildCollectionMonad('test1')
        .value((result) => assertThat(result, equalTo(['test1'])));
    });

    it('lifts a list of string to a collection', () => {
      buildCollectionMonad('test1', 'test2')
        .value((result) => assertThat(result, equalTo(['test1', 'test2'])));
    });
  });

  describe('concat', () => {
    it('other values can be joined as function', () => {
      buildCollectionMonad(['test1'])
        .concat(['test2'])
        .map((value) => value.toUpperCase())
        .value((result) => assertThat(result, equalTo(['TEST1', 'TEST2'])));
    });

    it('multiple values can be added', () => {
      buildCollectionMonad(['test1'])
        .concat(['test2'], ['test3'])
        .map((value) => value.toUpperCase())
        .value((result) => assertThat(result, equalTo(['TEST1', 'TEST2', 'TEST3'])));
    });

    it('multiple concat can be chained', () => {
      buildCollectionMonad(['test1'])
        .concat('test2')
        .concat('test3')
        .map((value) => value.toUpperCase())
        .value((result) => assertThat(result, equalTo(['TEST1', 'TEST2', 'TEST3'])));
    });

    it('concat a maybe monad', () => {
      buildCollectionMonad(['test1'])
        .concat(buildMaybeMonad('test2'))
        .map((value) => value.toUpperCase())
        .value((result) => assertThat(result, equalTo(['TEST1', 'TEST2'])));
    });
  });

  describe('chain', () => {
    it('normalizes monads', () => {
      buildCollectionMonad('test1', 'test2')
        .chain((value) => buildMaybeMonad(value))
        .value((result) => assertThat(result, equalTo(['test1', 'test2'])));
    });

    it('works with regular values as well', () => {
      buildCollectionMonad('test1', 'test2')
        .chain((value) => value)
        .value((result) => assertThat(result, equalTo(['test1', 'test2'])));
    });
  });

  describe('stripAfterEmpty', () => {
    it('removes every element after the first occurance of an empty value', () => {
      buildCollectionMonad('test1', 'test2', void 0, 'test3')
        .removeAfterEmpty()
        .value((result) => assertThat(result, equalTo(['test1', 'test2'])));
    });
  });

  describe('asString', () => {
    it('combines a collection to a string', () => {
      buildCollectionMonad('test1', 'test2')
        .asString(', ')
        .value((result) => assertThat(result, equalTo('test1, test2')));
    });

    it('combines a collection to a string and removed empty values', () => {
      buildCollectionMonad('test1', 'test2', void 0, null)
        .asString(', ')
        .value((result) => assertThat(result, equalTo('test1, test2')));
    });
  });
});

describe('leftPad', () => {
  it('with length 3 given transforms 12 into 012', () => assertThat(
    leftPad(12, 3), equalTo('012')));

  it('doesn\'t transform 10', () => assertThat(
    leftPad(10), equalTo('10')));

  it('transforms 1 to 01', () => assertThat(
    leftPad(1), equalTo('01')));

  it('transforms empty string to 00', () => assertThat(
    leftPad(''), equalTo('00')));

  it('transforms undefined to 00', () => assertThat(
    leftPad(void 0), equalTo('00')));

  it('transforms null to 00', () => assertThat(
    leftPad(null), equalTo('00')));
});

describe('fractionOfNumber', () => {
  it('1.3 responds 3', () => assertThat(
    fractionOfNumber(1.3), equalTo(0.3)));

  it('1.33 responds 33', () => assertThat(
    fractionOfNumber(1.33), equalTo(0.33)));

  it('1.333 responds 333', () => assertThat(
    fractionOfNumber(1.333), equalTo(0.333)));

  it('1 responds 0', () => assertThat(
    fractionOfNumber(1), equalTo(0)));
});

