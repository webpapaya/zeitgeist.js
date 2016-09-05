import { assertThat, equalTo } from 'hamjest';

const isEmpty = (value) => value === null || value === void 0;
const isCollection = (value) => value.map;
const isCollectionEmpty = (collection) => collection.length === 0;

export const buildMaybeMonad = (rawValue) => {
  const map = (fn) => {
    if(isEmpty(rawValue)) { return buildMaybeMonad(void 0); }
    if(isCollection(rawValue)) { return buildCollectionMonad(rawValue).map(fn); }

    return buildMaybeMonad(fn(rawValue));
  };

  const chain = (fn) => map(fn).rawValue;
  const join = (valueToBeJoined) => {
    const newCollection = isCollection(rawValue)
      ? [...rawValue, valueToBeJoined]
      : [rawValue, valueToBeJoined];

    return buildMaybeMonad(newCollection);
  };

  const value = (fn) => fn(rawValue);
  return { map, join, chain, value };
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

  describe('with am array', () => {
    it('value can be mapped', () => {
      const result = buildMaybeMonad(['test'])
        .map((value) => value.toUpperCase())
        .value;

      assertThat(result, equalTo(['TEST']));
    });

    it('value can be mapped', () => {
      const result = buildMaybeMonad(['test'])
        .map((value) => value.toUpperCase())
        .value;

      assertThat(result, equalTo(['TEST']));
    });

    it('other regular values can be joined', () => {
      const result = buildMaybeMonad(['test1'])
        .join('test2')
        .map((value) => value.toUpperCase())
        .value;

      assertThat(result, equalTo(['TEST1', 'TEST2']));
    });


  });
});


const buildCollectionMonad = (...rawValues) => {
  const rawValue = [].concat(...rawValues);
  const map = (fn) => {
    if(isCollectionEmpty(rawValue)) { return buildCollectionMonad([]); }

    const newValue = rawValue.map((singleValue) => {
      return buildMaybeMonad(singleValue)
        .map(fn)
        .value((value) => value);
    });

    return buildCollectionMonad(newValue);
  };

  const concat = (...valuesToBeJoined) =>
    buildCollectionMonad(rawValue.concat(...valuesToBeJoined));

  const toValue = () => rawValue;
  const value = (fn) => fn(rawValue);

  const asString = (delimiter) => {
    const filteredRawValue = rawValue.filter((item) => !isEmpty(item));
    return buildMaybeMonad(filteredRawValue.join(delimiter));
  };

  return { map, concat, toValue, value, asString };
};

describe.only('collection monad', () => {
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
        .concat(['test2'])
        .concat(['test3'])
        .map((value) => value.toUpperCase())
        .value((result) => assertThat(result, equalTo(['TEST1', 'TEST2', 'TEST3'])));
    });
  });

  describe('asString', () => {
    it('combines a collection to a string', () => {
      buildCollectionMonad('test1', 'test2')
        .asString(', ')
        .value((result) => assertThat(result, equalTo('test1, test2')));
    });

    it('combines a collection to a string and removed undefined', () => {
      buildCollectionMonad('test1', 'test2', void 0)
        .asString(', ')
        .value((result) => assertThat(result, equalTo('test1, test2')));
    });
  });
});


