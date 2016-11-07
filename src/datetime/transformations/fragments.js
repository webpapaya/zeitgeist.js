import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
} from '../constants';

import { buildMaybeMonad } from '../../utils';

const containsChar = (isoDatetime, s) => isoDatetime.indexOf(s) !== -1;

const findTimeSeparator = (isoDatetime) => {
  if (containsChar(isoDatetime, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
  return TIME_COMPONENT_SEPARATOR_2;
};

// TODO: maybe remove
export const separateDateAndTimeComponents = (isoDatetime) => {
  const timeSeparator = findTimeSeparator(isoDatetime);
  const [dateComponent, timeComponent = ''] = isoDatetime.split(timeSeparator);
  return { dateComponent, timeComponent };
};

const MATCH_DATE = /-?\d+(--?\d{2})?(--?\d{2})?/;
const MATCH_TIMEZONE = /[\d\sT][+-]\d{2}(:\d{2})?$/;
const MATCH_TIME = /^(([+-]?\d{2})?((:[+-]?\d{2})?((:[+-]?\d{2}(\.\d+)?)?)))/;
const MATCH_DATE_TIME_SEPERATOR = /[T\s]/;
const MATCH_UTC_TIMEZONE_SHORTHAND = /Z$/;

export const extractDate = (isoDatetime) => buildMaybeMonad(isoDatetime)
  .map((value) => value.match(MATCH_DATE))
  .map((value) => value[0])
  .setIfBlank('')
  .toValue();

export const extractTime = (isoDatetime) => buildMaybeMonad(isoDatetime)
  .map((value) => value.trim())
  .map((value) => value.split(MATCH_DATE_TIME_SEPERATOR))
  .map((value) => value[1])
  .map((value) => value.match(MATCH_TIME))
  .map((value) => value[0])
  .setIfBlank('')
  .toValue();

export const extractTimezoneAsTime = (isoDatetime) => buildMaybeMonad(isoDatetime)
  .map((value) => value.trim())
  .map((value) => value.replace(MATCH_DATE, ''))
  .map((value) => value.replace(MATCH_UTC_TIMEZONE_SHORTHAND, '+00:00'))
  .map((value) => value.match(MATCH_TIMEZONE))
  .map((value) => value[0].slice(1))
  .setIfBlank('')
  .toValue();

const toInteger = (value) => value ? parseInt(value, 10) : void 0;
const toFloat = (value) => value ? parseFloat(value) : void 0;

export const toFragments = (isoDatetime) => {
  if (typeof isoDatetime === 'object') { return isoDatetime; }

  const dateComponent = extractDate(isoDatetime);
  const timeComponent = extractTime(isoDatetime);
  const timezoneComponent = extractTimezoneAsTime(isoDatetime);

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
