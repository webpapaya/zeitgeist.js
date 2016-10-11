export const isEmpty = (value) => value === null || value === void 0 || value === '';
export const isCollectionEmpty = (collection) => collection.length === 0;

export const createRegexBuilder = (regex = '') => {
  const valueOf = (value) => value.isBuilder ? value.toValue() : value;

  const convertToValue = (fn) => (regexBuilder) =>
    createRegexBuilder(fn(valueOf(regexBuilder)));

  const maybe = convertToValue(
    (newRegex) => `(${newRegex})?`);

  const and = convertToValue(
    (newRegex) => `${regex}${newRegex}`);

  const or = convertToValue(
    (newRegex) => isEmpty(regex) ? `${newRegex}` : `${regex}|${newRegex}`);

  const join = (...array) => createRegexBuilder([regex, ...array].join(''));

  const startOfLine = () => and('^');
  const endOfLine = () => and('$');

  const toValue = () => regex;
  const test = (value) => (new RegExp(toValue())).test(value);

  return {
    join,
    startOfLine,
    endOfLine,
    maybe,
    and,
    or,
    toValue,
    test,
    isBuilder: true,
  };
};

const buildEmptyCollectionMonad = () => buildCollectionMonad([]);

export const fractionOfNumber = (number) => {
  const fractionAsString = number.toString().split('.')[1] || '0';
  return parseFloat(fractionAsString) / (10 ** fractionAsString.length);
};

export const leftPad = (value, length = 2) => {
  const string = isEmpty(value) ? '' : `${value}`;
  if (string.length >= length) { return string; }
  return leftPad(`0${string}`, length);
};

export const buildMaybeMonad = (rawValue) => {
  const map = (fn) => {
    if (isEmpty(rawValue)) { return buildMaybeMonad(void 0); }
    return buildMaybeMonad(fn(rawValue));
  };

  const value = (fn) => fn(rawValue);
  const chain = (fn) => map(fn).toValue();
  const toValue = () => rawValue;
  const asString = () => buildMaybeMonad(`${rawValue}`);
  const setIfBlank = (newValue) => buildMaybeMonad(isEmpty(rawValue) ? newValue : rawValue);
  const debug = () => {
    console.log(rawValue); // eslint-disable-line no-console
    return buildMaybeMonad(rawValue);
  };

  return { map, chain, value, toValue, asString, debug, setIfBlank, isMonad: true };
};


export const buildCollectionMonad = (...rawValues) => {
  const rawValue = [].concat(...rawValues);
  const map = (fn) => {
    if (isCollectionEmpty(rawValue)) { return buildEmptyCollectionMonad(); }

    const newValue = rawValue.map((singleValue) => buildMaybeMonad(singleValue).chain(fn));
    return buildCollectionMonad(newValue);
  };

  const concat = (...valuesToBeJoined) => {
    const normalizedValuesToBeJoined = valuesToBeJoined.map((value) => {
      return value && value.isMonad ? value.toValue() : value;
    });

    return buildCollectionMonad(rawValue.concat(...normalizedValuesToBeJoined));
  };

  const chain = (fn) => {
    return map((value) => {
      const newValue = fn(value);
      return newValue.isMonad ? newValue.toValue() : value;
    });
  };

  const removeAfterEmpty = (filteredArray = rawValue) => {
    const [first, ...rest] = filteredArray;
    if (isEmpty(first)) { return buildEmptyCollectionMonad(); }
    return buildCollectionMonad(first, removeAfterEmpty(rest).toValue());
  };

  const toValue = () => rawValue;
  const value = (fn) => fn(rawValue);

  const asString = (delimiter) => {
    const filteredRawValue = rawValue.filter((item) => !isEmpty(item));
    return buildMaybeMonad(filteredRawValue.join(delimiter));
  };

  return { map, concat, toValue, value, asString, chain, removeAfterEmpty, isMonad: true };
};


export const tco = (f) => {
  let value;
  let active = false;
  const accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);

    if (!active) {
      active = true;

      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }

      active = false;

      return value;
    }
  };
};

export const compose = (...fns) => (input) =>
  fns.reduce((value, currentFn) => currentFn(value), input);
