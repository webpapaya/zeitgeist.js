import { TIME_DESIGNATOR, DURATION_DESIGNATOR } from './constants';
import { createRegexBuilder } from '../utils';

const MATCH_NUMBER = /[+-]?\d+(\.\d+)?/.source;
const MATCH_YEAR = `(${MATCH_NUMBER}Y)?`;
const MATCH_MONTH = `(${MATCH_NUMBER}M)?`;
const MATCH_WEEK = `(${MATCH_NUMBER}W)?`;
const MATCH_DAY = `(${MATCH_NUMBER}D)?`;

const MATCH_HOUR = `(${MATCH_NUMBER}H)?`;
const MATCH_MINUTE = `(${MATCH_NUMBER}M)?`;
const MATCH_SECOND = `(${MATCH_NUMBER}S)?`;

const MATCH_DATE = createRegexBuilder('')
  .and(MATCH_YEAR)
  .and(MATCH_MONTH)
  .and(MATCH_WEEK)
  .and(MATCH_DAY)
  .toValue();

const MATCH_TIME = createRegexBuilder('')
  .maybe(createRegexBuilder('')
    .and(TIME_DESIGNATOR)
    .and(MATCH_HOUR)
    .and(MATCH_MINUTE)
    .and(MATCH_SECOND)
  ).toValue();

const MATCH_DURATION = createRegexBuilder('')
  .and('^')
  .and(DURATION_DESIGNATOR)
  .and(MATCH_TIME)
  .and(MATCH_DATE)
  .and(MATCH_TIME)
  .and('$');

export const isValid = (isoString) =>
  MATCH_DURATION.test(isoString.toUpperCase());
