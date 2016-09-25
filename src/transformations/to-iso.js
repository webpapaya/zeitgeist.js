import {
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
  TIME_COMPONENT_SEPARATOR_1,
} from '../constants';

import {
  buildCollectionMonad,
  leftPad,
  fractionOfNumber,
} from '../utils';

const leftPadFullNumber = (value) => {
  const fraction = fractionOfNumber(value);
  const full = Math.floor(value/1);

  return fraction === 0
    ? `${leftPad(full)}`
    : `${leftPad(full)}.${fraction.toString().replace('0.', '')}`;
};

const buildComponent = (fragments, delimiter) => {
  return buildCollectionMonad(fragments)
    .removeAfterEmpty()
    .map(leftPadFullNumber)
    .asString(delimiter);
};

export const toIso = (fragments) => {
  if (typeof fragments === 'string') { return fragments; }

  return buildCollectionMonad([])
    .concat(toIsoDate(fragments))
    .concat(toIsoTime(fragments))
    .asString(TIME_COMPONENT_SEPARATOR_1)
    .toValue();
};

export const toIsoDate = (fragments) => {
  return buildComponent([
    fragments.year,
    fragments.month,
    fragments.day,
  ], DATE_UNIT_SEPARATOR).toValue();
};

export const toIsoTime = (fragments) => {
  return buildComponent([
    fragments.hour,
    fragments.minute,
    fragments.second,
  ], TIME_UNIT_SEPARATOR).toValue();
};
