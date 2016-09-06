const NEWLINE = '\n';
const TAB = '\t';

const TZ_LEAP_IDENTIFIER = 'Leap';
const TZ_MONTHS = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

export const readLeapSeconds = (fileContents) => {
  return fileContents.split(NEWLINE)
    .filter((line) => line.startsWith(TZ_LEAP_IDENTIFIER))
    .map((line) => line.split(TAB))
    .reduce((previous, [ type, year, month, day, time, correction ]) => {
      return {
        ...previous,
        [`${year}-${TZ_MONTHS[month]}-${day}`]: {
          correction: correction === '+' ? 1 : -1,
          time: time
        }
      };
    }, {});
};
