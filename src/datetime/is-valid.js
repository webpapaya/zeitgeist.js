import { createRegexBuilder } from '../utils';
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
    .endOfLine())

  .or(createRegexBuilder())
  .startOfLine()
  .join('T', MATCH_HOUR, ':', MATCH_MINUTE)
  .endOfLine();


const isValid = (isoDatetime) => {
  if (typeof isoDatetime === 'object') { return true; }
  return THE_MOTHER_OF_ISO8601_DATE_TIME.test(isoDatetime);
};

export default isValid;
