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

const THE_MOTHER_OF_ISO8601 = new RegExp([
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

export const isValid = (isoString) => THE_MOTHER_OF_ISO8601.test(isoString);

export const validateFirstArg = (fn) => {
  return (isoString, ...args) => isValid(isoString)
    ? fn(isoString, ...args)
    : 'Invalid Format';
};

export const validateFirstAndSecondArg = (fn) => {
  return (firstArg, secondArg, ...args) => {
    const firstValidated = isValid(firstArg) ? firstArg : 'Invalid Format';
    const secondValidated = isValid(secondArg) ? secondArg : 'Invalid Format';
    return fn(firstValidated, secondValidated, ...args);
  };
};
