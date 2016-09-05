import {
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
  TIME_COMPONENT_SEPARATOR_1,
} from '../constants';

import { buildCollectionMonad } from '../utils';

const leftPad = (value) => {
  const string = `${value}`;
  const pad = '00';
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
    fragments.day,
  ], DATE_UNIT_SEPARATOR);

  const timeComponent = buildComponent([
    fragments.hour,
    fragments.minute,
    fragments.second,
  ], TIME_UNIT_SEPARATOR);

  return buildCollectionMonad([])
    .concat(dateComponent)
    .concat(timeComponent)
    .asString(TIME_COMPONENT_SEPARATOR_1)
    .toValue();
};
