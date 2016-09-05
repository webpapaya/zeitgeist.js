import { buildCollectionMonad } from './utils';

const leftPad = (value) => {
  const string = `${value}`;
  const pad = "00";
  return pad.substring(0, pad.length - string.length) + string;
};

const buildComponent = (fractions, delimiter) => {
  return buildCollectionMonad(fractions)
    .removeAfterEmpty()
    .map(leftPad)
    .asString(delimiter);
};

export const toIso = (fractions) => {
  const dateComponent = buildComponent([
    fractions.year,
    fractions.month,
    fractions.day
  ], '-');

  const timeComponent = buildComponent([
    fractions.hour,
    fractions.minute,
    fractions.second,
  ], ':');

  return buildCollectionMonad([])
    .concat(dateComponent)
    .concat(timeComponent)
    .asString('T')
    .toValue();
};
