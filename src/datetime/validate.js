import { createRegexBuilder } from '../utils';
import { INVALID_DATETIME } from '../core/constants';

const MATCH_INT = createRegexBuilder()
  .and(/[+-]?\d+/.source);

const MATCH_NUMBER = createRegexBuilder()
  .and(MATCH_INT)
  .and(/(\.\d+)?/.source);

const MATCH_YEAR = MATCH_INT.toValue();
const MATCH_MONTH = MATCH_INT.toValue();
const MATCH_DAY = MATCH_INT.toValue();
const MATCH_HOUR = MATCH_INT.toValue();
const MATCH_MINUTE = MATCH_INT.toValue();
const MATCH_SECOND = MATCH_NUMBER.toValue();

const MATCH_TIMEZONE = createRegexBuilder()
  .and(/[+-]\d{2}(:\d{2})?|Z/.source)
  .toValue();

const MATCH_TIME_SEPARATOR = /[\sT]/.source;

const THE_MOTHER_OF_ISO8601_DATE_TIME = createRegexBuilder()
  .or(createRegexBuilder()
    .startOfLine()
    .and(MATCH_YEAR)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIME_SEPARATOR)
    .join(MATCH_HOUR)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIME_SEPARATOR)
    .join(MATCH_HOUR, ':', MATCH_MINUTE)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIME_SEPARATOR)
    .join(MATCH_HOUR, ':', MATCH_MINUTE, ':', MATCH_SECOND)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIME_SEPARATOR)
    .join(MATCH_HOUR, ':', MATCH_MINUTE, ':', MATCH_SECOND)
    .and(MATCH_TIMEZONE)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIME_SEPARATOR)
    .join(MATCH_HOUR, ':', MATCH_MINUTE)
    .and(MATCH_TIMEZONE)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIME_SEPARATOR)
    .join(MATCH_HOUR)
    .and(MATCH_TIMEZONE)
    .endOfLine())

  .or(createRegexBuilder()
    .startOfLine()
    .join(MATCH_YEAR, '-', MATCH_MONTH, '-', MATCH_DAY)
    .and(MATCH_TIMEZONE)
    .endOfLine());

export const isValid = (isoDatetime) => THE_MOTHER_OF_ISO8601_DATE_TIME.test(isoDatetime);

export const validateFirstArg = (fn) => (isoDatetime, ...args) =>
  isValid(isoDatetime) ? fn(isoDatetime, ...args) : INVALID_DATETIME;

export const validateFirstAndSecondArg = (fn) => (firstArg, secondArg, ...args) => {
  const isFirstValid = isValid(firstArg);
  const isSecondValid = isValid(secondArg);

  return isFirstValid && isSecondValid
    ? fn(firstArg, secondArg, ...args)
    : [isFirstValid ? firstArg : INVALID_DATETIME, isSecondValid ? secondArg : INVALID_DATETIME];
};
