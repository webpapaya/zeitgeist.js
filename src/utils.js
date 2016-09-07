export const isEmpty = (value) => value === null || value === void 0 || value === '';
export const isCollectionEmpty = (collection) => collection.length === 0;

const buildEmptyCollectionMonad = () => buildCollectionMonad([]);

export const leftPad = (value) => {
  const string = isEmpty(value) ? '' : `${value}`;
  const pad = '00';
  return pad.substring(0, pad.length - string.length) + string;
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

  return { map, chain, value, toValue, asString, isMonad: true };
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
