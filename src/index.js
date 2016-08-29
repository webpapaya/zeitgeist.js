import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
  FEBRUARY,
  DAYS_IN_MONTHS,
} from './constants';

const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;
const toInt = (value) => parseInt(value, 10);

const parseDateUnit = (value) => value ? toInt(value) : 1;
const parseTimeUnit = (value) => value ? parseFloat(value) : 0;

const findTimeSeperator = (isoString) => {
  if (containsChar(isoString, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
  return TIME_COMPONENT_SEPARATOR_2;
};

const separateDateAndTimeComponents = (isoString) => {
  const timeSeparator = findTimeSeperator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeparator);
  return { dateComponent, timeComponent };
};

export const parseIso = (isoString) => {
  const { dateComponent, timeComponent } = separateDateAndTimeComponents(isoString);
  const [year, month, day] = dateComponent.split(DATE_UNIT_SEPARATOR);
  const [hour, minute, second] = timeComponent.split(TIME_UNIT_SEPARATOR);

  return {
    year: toInt(year),
    month: parseDateUnit(month),
    day: parseDateUnit(day),
    hour: parseTimeUnit(hour),
    minute: parseTimeUnit(minute),
    second: parseTimeUnit(second),
  };
};

const isLeapMonth = (isoString, month) =>
  month === FEBRUARY && isLeapYear(isoString);

export const daysInMonth = (isoString, month) => {
  if (isLeapMonth(isoString, month)) { return 29; }
  return DAYS_IN_MONTHS[month];
};

export const isLeapYear = (isoString) => {
  const year = parseIso(isoString).year;
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};
