import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
} from '../constants';

import { buildMaybeMonad } from '../utils';

const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;

const findTimeSeparator = (isoString) => {
  if (containsChar(isoString, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
  return TIME_COMPONENT_SEPARATOR_2;
};

// TODO: maybe remove
export const separateDateAndTimeComponents = (isoString) => {
  const timeSeparator = findTimeSeparator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeparator);
  return { dateComponent, timeComponent };
};

const MATCH_DATE = /-?\d+(--?\d{2})?(--?\d{2})?/;
const MATCH_TIMEZONE = /[\d\sT][+-]\d{2}(:\d{2})?$/;
const MATCH_TIME = /^(([+-]?\d{2})?((:[+-]?\d{2})?((:[+-]?\d{2}(\.\d+)?)?)))/;
const MATCH_DATE_TIME_SEPERATOR = /[T\s]/;
const MATCH_UTC_TIMEZONE_SHORTHAND = /Z$/;

export const extractDate = (isoString) => buildMaybeMonad(isoString)
  .map((value) => value.match(MATCH_DATE))
  .map((value) => value[0])
  .setIfBlank('')
  .toValue();

export const extractTime = (isoString) => buildMaybeMonad(isoString)
  .map((value) => value.trim())
  .map((value) => value.split(MATCH_DATE_TIME_SEPERATOR))
  .map((value) => value[1])
  .map((value) => value.match(MATCH_TIME))
  .map((value) => value[0])
  .setIfBlank('')
  .toValue();

export const extractTimezoneAsTime = (isoString) => buildMaybeMonad(isoString)
  .map((value) => value.trim())
  .map((value) => value.replace(MATCH_DATE, ''))
  .map((value) => value.replace(MATCH_UTC_TIMEZONE_SHORTHAND, '+00:00'))
  .map((value) => value.match(MATCH_TIMEZONE))
  .map((value) => value[0].slice(1))
  .setIfBlank('')
  .toValue();

const toInteger = (value) => value ? parseInt(value, 10) : void 0;
const toFloat = (value) => value ? parseFloat(value) : void 0;

export const toFragments = (isoString) => {
  if (typeof isoString === 'object') { return isoString; }

  const dateComponent = extractDate(isoString);
  const timeComponent = extractTime(isoString);
  const timezoneComponent = extractTimezoneAsTime(isoString);

  const [year, month, day] = dateComponent.split(DATE_UNIT_SEPARATOR);
  const [hour, minute, second] = timeComponent.split(TIME_UNIT_SEPARATOR);
  const [timezoneHour, timezoneMinute] = timezoneComponent.split(TIME_UNIT_SEPARATOR);

  return Object.freeze({
    year: toInteger(year),
    month: toInteger(month),
    day: toInteger(day),
    hour: toInteger(hour),
    minute: toInteger(minute),
    second: toFloat(second),
    timezoneHour: toInteger(timezoneHour),
    timezoneMinute: toInteger(timezoneMinute),
  });
};
