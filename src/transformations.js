import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
} from './constants';

import { buildCollectionMonad } from './utils';

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


const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;
const toInt = (value) => parseInt(value, 10);

const parseDateUnit = (value) => value ? toInt(value) : 1;
const parseTimeUnit = (value) => value ? parseFloat(value) : 0;

const findTimeSeparator = (isoString) => {
  if (containsChar(isoString, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
  return TIME_COMPONENT_SEPARATOR_2;
};

const separateDateAndTimeComponents = (isoString) => {
  const timeSeparator = findTimeSeparator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeparator);
  return { dateComponent, timeComponent };
};

export const toFragments = (isoString) => {
  const { dateComponent, timeComponent } = separateDateAndTimeComponents(isoString);
  const [year, month, day] = dateComponent.split(DATE_UNIT_SEPARATOR);
  const [hour, minute, second] = timeComponent.split(TIME_UNIT_SEPARATOR);

  return {
    year: toInt(year),
    month: parseDateUnit(month),
    day: parseDateUnit(day),
    hour: parseTimeUnit(hour),
    minute: parseTimeUnit(minute),
    second: parseTimeUnit(second),
  };
};
