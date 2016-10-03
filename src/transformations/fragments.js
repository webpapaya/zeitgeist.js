import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
} from '../constants';

const MATCH_DATE = /-?\d+(-\d{2})?(-\d{2})?/;

const matchFirst = (string, regex) => {
  const matchedValues = string.match(regex);
  return matchedValues ? matchedValues[0] : '';
};

const containsTimezone = (isoString) => isoString
    .replace(/.*:[-+].*/, '')
    .match(/[T|\s].*[+|-]/);

const extractTimezone = (isoString) => isoString
  .replace(/.*:[-+].*/, '')
  .replace(/.*\+/, '+')
  .replace(/.*-/, '-');

export const extractDate = (isoString) => matchFirst(isoString, MATCH_DATE);

export const extractTime = (isoString) => isoString
  .replace(/^.*[T\s]|.*/, '')
  .replace(/Z$/, '')
  .replace(/[+-].*$/, '');

export const getTimezoneAsTime = (isoString) =>
  containsTimezone(isoString) ? extractTimezone(isoString) : '+00:00';

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
