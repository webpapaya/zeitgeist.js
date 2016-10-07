import { INVALID_FORMAT } from '../core/constants';


const MATCH_YEAR = /[+-]?\d+\b/.source;
const MATCH_MONTH = /[+-]?\d{2}/.source;
const MATCH_DAY = /[+-]?\d{2}/.source;

const MATCH_HOUR = /[+-]?\d{2}/.source;
const MATCH_MINUTE = /[+-]?\d{2}/.source;
const MATCH_SECOND = /[+-]?\d{2}(\.\d+)?/.source;

const MATCH_TIMEZONE = /[+-]\d{2}(:\d{2})?|Z/.source;
const MATCH_TIME_SEPARATOR = /[\sT]/.source;

const MATCH_YEAR_MONTH_DAY = `${MATCH_YEAR}-${MATCH_MONTH}-${MATCH_DAY}`;
const MATCH_HOUR_MINUTE_SECOND = `${MATCH_HOUR}:${MATCH_MINUTE}:${MATCH_SECOND}`;
const MATCH_DATE_AND_TIME = `${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR_MINUTE_SECOND}`;

const THE_MOTHER_OF_ISO8601_DATE_TIME = new RegExp([
  `^${MATCH_YEAR}$`,
  `^${MATCH_YEAR}-${MATCH_MONTH}$`,
  `^${MATCH_YEAR}-${MATCH_MONTH}-${MATCH_DAY}$`,
  `^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}$`,
  `^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}:${MATCH_MINUTE}$`,
  `^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}:${MATCH_MINUTE}:${MATCH_SECOND}$`,
  `^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}:${MATCH_MINUTE}${MATCH_TIMEZONE}$`,
  `^${MATCH_YEAR_MONTH_DAY}${MATCH_TIME_SEPARATOR}${MATCH_HOUR}${MATCH_TIMEZONE}$`,
  `^${MATCH_DATE_AND_TIME}${MATCH_TIMEZONE}`,
].join('|'));

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
