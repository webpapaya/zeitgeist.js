import { assertThat, equalTo } from 'hamjest';

const isEmpty = (value) => value === null || value === void 0;
const isCollection = (value) => value.map;
const isCollectionEmpty = (collection) => collection.length === 0;

export const buildMaybeMonad = (rawValue) => {
  const map = (fn) => {
    if(isEmpty(rawValue)) { return buildMaybeMonad(void 0); }
    return buildMaybeMonad(fn(rawValue));
  };

  const value = (fn) => fn(rawValue);
  const chain = (fn) => map(fn).toValue();
  const toValue = () => rawValue;
  const asString = () => buildMaybeMonad(`${rawValue}`);

  return { map, chain, value, toValue, asString, isMonad: true };
};

describe('maybeMonad', () => {
  describe('with a regular value', () => {
    it('value can be mapped', () => buildMaybeMonad('test')
      .map((value) => value.toUpperCase())
      .map((value) => assertThat(value, equalTo('TEST'))));

    it('value can be mapped multiple times', () => buildMaybeMonad('test')
      .map((value) => value.toUpperCase())
      .map((value) => value + '!!!')
      .map((value) => assertThat(value, equalTo('TEST!!!'))));

    it('chain works', () => buildMaybeMonad('test')
      .chain((value) => buildMaybeMonad(value.toUpperCase()))
      .map((value) => assertThat(value, equalTo('TEST'))));
  });
});

const buildCollectionMonad = (...rawValues) => {
  const rawValue = [].concat(...rawValues);
  const map = (fn) => {
    if(isCollectionEmpty(rawValue)) { return buildCollectionMonad([]); }

    const newValue = rawValue.map((singleValue) => buildMaybeMonad(singleValue).chain(fn));
    return buildCollectionMonad(newValue);
  };

  const concat = (...valuesToBeJoined) => {
    const normalizedValuesToBeJoined = valuesToBeJoined.map((value) => {
      return value.isMonad ? value.toValue() : value;
    });

    return buildCollectionMonad(rawValue.concat(...normalizedValuesToBeJoined));
  };

  const chain = (fn) => {
    return map((value) => {
      const newValue = fn(value);
      return newValue.isMonad ? newValue.toValue() : value;
    });
  };


  const toValue = () => rawValue;
  const value = (fn) => fn(rawValue);

  const asString = (delimiter) => {
    const filteredRawValue = rawValue.filter((item) => !isEmpty(item));
    return buildMaybeMonad(filteredRawValue.join(delimiter));
  };

  return { map, concat, toValue, value, asString, chain, isMonad: true };
};

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


