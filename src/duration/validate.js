import { TIME_DESIGNATOR, DURATION_DESIGNATOR } from './constants';

const MATCH_NUMBER = /[+-]?\d+(\.\d+)?/.source;
const MATCH_YEAR = `(${MATCH_NUMBER}Y)?`;
const MATCH_MONTH = `(${MATCH_NUMBER}M)?`;
const MATCH_WEEK = `(${MATCH_NUMBER}W)?`;
const MATCH_DAY = `(${MATCH_NUMBER}D)?`;

const MATCH_HOUR = `(${MATCH_NUMBER}H)?`;
const MATCH_MINUTE = `(${MATCH_NUMBER}M)?`;
const MATCH_SECOND = `(${MATCH_NUMBER}S)?`;

const MATCH_DATE = `${MATCH_YEAR}${MATCH_MONTH}${MATCH_WEEK}${MATCH_DAY}`;
const MATCH_TIME = `(${TIME_DESIGNATOR}${MATCH_HOUR}${MATCH_MINUTE}${MATCH_SECOND})?`;

export const isValid = (isoString) => {
  console.log([
    '^',
    DURATION_DESIGNATOR,
    MATCH_DATE,
    MATCH_TIME,
    '$'
  ].join(''))
  return new RegExp([
    '^',
    DURATION_DESIGNATOR,
    MATCH_DATE,
    MATCH_TIME,
    '$'
  ].join('')).test(isoString.toUpperCase());
};
