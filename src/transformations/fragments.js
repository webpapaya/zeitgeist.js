import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
} from '../constants';

import { buildMaybeMonad } from '../utils';

const MATCH_DATE = /-?\d+(--?\d{2})?(--?\d{2})?/;
const MATCH_TIMEZONE = /[\d\sT][+-]\d{2}(:\d{2})?$/;
const MATCH_TIME = /^(([+-]?\d{2})?((:[+-]?\d{2})?((:[+-]?\d{2}(\.\d+)?)?)))/;
const MATCH_DATE_TIME_SEPERATOR = /[T\s]/;
const MATCH_UTC_TIMEZONE_SHORTHAND = /Z$/;

const matchFirst = (string, regex) => {
  const matchedValues = string.match(regex);
  return matchedValues ? matchedValues[0] : '';
};

export const extractDate = (isoString) =>
  matchFirst(isoString, MATCH_DATE);

export const extractTime = (isoString) => buildMaybeMonad(isoString)
  .map((value) => value.trim())
  .map((value) => value.split(MATCH_DATE_TIME_SEPERATOR))
  .map((value) => value[1])
  .map((value) => value.match(MATCH_TIME))
  .map((value) => value[0])
  .setIfBlank('')
  .toValue();

export const getTimezoneAsTime = (isoString) => buildMaybeMonad(isoString)
  .map((value) => value.trim())
  .map((value) => value.replace(MATCH_DATE, ''))
  .map((value) => value.replace(MATCH_UTC_TIMEZONE_SHORTHAND, ' +00:00'))
  .map((value) => value.match(MATCH_TIMEZONE))
  .map((value) => value[0].slice(1))
  .setIfBlank('')
  .toValue();

const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;
const toInt = (value) => parseInt(value, 10);

const parseDateUnit = (value) => value ? toInt(value) : void 0;
const parseTimeUnit = (value) => value ? parseFloat(value) : void 0;

const findTimeSeparator = (isoString) => {
  if (containsChar(isoString, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
  return TIME_COMPONENT_SEPARATOR_2;
};

export const separateDateAndTimeComponents = (isoString) => {
  const timeSeparator = findTimeSeparator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeparator);
  return { dateComponent, timeComponent };
};

export const toFragments = (isoString) => {
  if (typeof isoString === 'object') { return isoString; }

  const dateComponent = extractDate(isoString);
  const timeComponent = extractTime(isoString);

  const [year, month, day] = dateComponent.split(DATE_UNIT_SEPARATOR);
  const [hour, minute, second] = timeComponent.split(TIME_UNIT_SEPARATOR);

  return Object.freeze({
    year: year ? toInt(year) : void 0,
    month: parseDateUnit(month),
    day: parseDateUnit(day),
    hour: parseTimeUnit(hour),
    minute: parseTimeUnit(minute),
    second: parseTimeUnit(second),
  });
};
