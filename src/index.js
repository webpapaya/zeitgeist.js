const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;

const DATE_UNIT_SEPARATOR = '-';
const TIME_UNIT_SEPARATOR = ':';

const TIME_COMPONENT_SEPARATOR_1 = 'T';
const TIME_COMPONENT_SEPARATOR_2 = ' ';

const JANUARY = 1;
const FEBRUARY = 2;
const MARCH = 3;
const APRIL = 4;
const MAY = 5;
const JUNE= 6;
const JULY = 7;
const AUGUST = 8;
const SEPTEMBER = 9;
const OCTOBER = 10;
const NOVEMBER = 11;
const DECEMBER = 12;

const DAYS_IN_MONTHS = {
  [JANUARY]: 31,
  [FEBRUARY]: 28,
  [MARCH]: 31,
  [APRIL]: 30,
  [MAY]: 31,
  [JUNE]: 30,
  [JULY]: 30,
  [AUGUST]: 31,
  [SEPTEMBER]: 30,
  [OCTOBER]: 31,
  [NOVEMBER]: 30,
  [DECEMBER]: 31,
};


const parseDateUnit = (value) => value ? parseInt(value, 10) : 1;
const parseTimeUnit = (value) => value ? parseFloat(value) : 0;

const findTimeSeperator = (isoString) => {
  if(containsChar(isoString, TIME_COMPONENT_SEPARATOR_1)) { return TIME_COMPONENT_SEPARATOR_1; }
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
    year: parseInt(year),
    month: parseDateUnit(month),
    day: parseDateUnit(day),
    hour: parseTimeUnit(hour),
    minute: parseTimeUnit(minute),
    second: parseTimeUnit(second),
  };
};


export const daysInMonth = (isoString, month) => {
  if(month === FEBRUARY && isLeapYear(isoString) ) { return 29; }
  return DAYS_IN_MONTHS[month ];
};

export const isLeapYear = (isoString) => {
  const year = parseIso(isoString).year;
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};
