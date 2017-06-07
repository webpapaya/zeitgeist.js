import {
  execute,
  TZ_TAR_GZ,
  TZ_URL,
  TMP_DIR,
} from './utils';

import { readFileSync, writeFileSync } from 'fs';

const downloadLatestTzData = () => {
  return Promise.resolve()
    .then(() => execute(`wget ${TZ_URL}`))
    .then(() => execute(`mkdir -p ${TMP_DIR}`))
    .then(() => execute(`tar zxvf ${TZ_TAR_GZ} -C ${TMP_DIR}`))
    .then(() => execute(`rm ${TZ_TAR_GZ}`));
};

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
        [`${year}-${TZ_MONTHS[month]}-${day}T${time}`]: {
          correction: correction === '+' ? 1 : -1,
        }
      };
    }, {});
};


const fetchAndStoreLeapSeconds = () => {
  return downloadLatestTzData()
    .then(() => {
      const fileContent = readFileSync('.tzdata/leapseconds', 'utf8');
      return readLeapSeconds(fileContent);
    })
    .then((leapSeconds) => JSON.stringify(leapSeconds))
    .then((leapSeconds) => {
      writeFileSync('src/data/leapseconds.json', leapSeconds, 'utf8');
    });
};

export default fetchAndStoreLeapSeconds;
