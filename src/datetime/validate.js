import { createRegexBuilder } from '../utils';
import { INVALID_FORMAT } from '../core/constants';


const MATCH_YEAR = /[+-]?\d+/.source;
const MATCH_MONTH = /[+-]?\d{2}/.source;
const MATCH_DAY = /[+-]?\d{2}/.source;

const MATCH_HOUR = /[+-]?\d{2}/.source;
const MATCH_MINUTE = /[+-]?\d{2}/.source;
const MATCH_SECOND = /[+-]?\d{2}(\.\d+)?/.source;

const MATCH_TIMEZONE = /[+-]\d{2}(:\d{2})?|Z/.source;
const MATCH_TIME_SEPARATOR = /[\sT]/.source;

const MATCH_YEAR_MONTH_DAY = createRegexBuilder()
  .and(MATCH_YEAR)
  .and('-')
  .and(MATCH_MONTH)
  .and('-')
  .and(MATCH_DAY)
  .toValue();

const MATCH_HOUR_MINUTE_SECOND = createRegexBuilder()
  .and(MATCH_HOUR)
  .and(':')
  .and(MATCH_MINUTE)
  .and(':')
  .and(MATCH_SECOND)
  .toValue();

const MATCH_DATE_AND_TIME = `${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR_MINUTE_SECOND}`;

const THE_MOTHER_OF_ISO8601_DATE_TIME = createRegexBuilder()
  .or(`^${MATCH_YEAR}$`)
  .or(`^${MATCH_YEAR}-${MATCH_MONTH}$`)
  .or(`^${MATCH_YEAR}-${MATCH_MONTH}-${MATCH_DAY}$`)
  .or(`^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}$`)
  .or(`^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}:${MATCH_MINUTE}$`)
  .or(`^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}:${MATCH_MINUTE}:${MATCH_SECOND}$`)
  .or(`^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}:${MATCH_MINUTE}${MATCH_TIMEZONE}$`)
  .or(`^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}${MATCH_TIMEZONE}$`)
  .or(`^${MATCH_DATE_AND_TIME}${MATCH_TIMEZONE}`);

export const isValid = (isoString) => THE_MOTHER_OF_ISO8601_DATE_TIME.test(isoString);

export const validateFirstArg = (fn) => (isoString, ...args) =>
  isValid(isoString) ? fn(isoString, ...args) : INVALID_FORMAT;

export const validateFirstAndSecondArg = (fn) => (firstArg, secondArg, ...args) => {
  const isFirstValid = isValid(firstArg);
  const isSecondValid = isValid(secondArg);

  return isFirstValid && isSecondValid
    ? fn(firstArg, secondArg, ...args)
    : [ isFirstValid ? firstArg : INVALID_FORMAT, isSecondValid ? secondArg : INVALID_FORMAT ];
};
