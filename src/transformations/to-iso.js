import { buildCollectionMonad } from '../utils';

const leftPad = (value) => {
  const string = `${value}`;
  const pad = "00";
  return pad.substring(0, pad.length - string.length) + string;
};

const buildComponent = (fragments, delimiter) => {
  return buildCollectionMonad(fragments)
    .removeAfterEmpty()
    .map(leftPad)
    .asString(delimiter);
};

export const toIso = (fragments) => {
  const dateComponent = buildComponent([
    fragments.year,
    fragments.month,
    fragments.day
  ], '-');

  const timeComponent = buildComponent([
    fragments.hour,
    fragments.minute,
    fragments.second,
  ], ':');

  return buildCollectionMonad([])
    .concat(dateComponent)
    .concat(timeComponent)
    .asString('T')
    .toValue();
};
