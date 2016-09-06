import {
  TIME_COMPONENT_SEPARATOR_1,
  TIME_COMPONENT_SEPARATOR_2,
  DATE_UNIT_SEPARATOR,
  TIME_UNIT_SEPARATOR,
} from '../constants';

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
