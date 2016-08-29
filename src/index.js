const containsChar = (isoString, s) => isoString.indexOf(s) !== -1;

const DATE_UNIT_SEPARATOR = '-';
const TIME_UNIT_SEPARATOR = ':';

const TIME_COMPONENT_SEPARATOR_1 = 'T';
const TIME_COMPONENT_SEPARATOR_2 = ' ';

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

const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 30, 31, 30, 31, 30, 31];
export const daysInMonth = (isoString, month) => {
  if(month === 2 && isLeapYear(isoString) ) { return 29; }
  return DAYS_IN_MONTHS[month - 1];
};


export const isLeapYear = (isoString) => {
  const year = parseIso(isoString).year;
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};
