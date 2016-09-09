import { toFragments } from './index';
import { leftPad } from './utils';


// const weekdaysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
// const weekdaysShort = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
// const weekdayMin = 'Su Mo Tu We Th Fr Sa'.split(' ');

const monthsLong = 'January February March April May June July August September October November December'.split(' ');
const monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

const formatYYYY = (fragments) => `${fragments.year}`;
const formatYY = (fragments) => formatYYYY(fragments).slice(-2);
const formatY = (fragments) => formatYYYY(fragments);

const formatD = (fragments) => `${fragments.day}`;
const formatDD = (fragments) => leftPad(formatD(fragments));

const formatM = (fragments) => `${fragments.month}`;
const formatMM = (fragments) => leftPad(formatM(fragments));
const formatMMM = (fragments) => monthsShort[fragments.month - 1];
const formatMMMM = (fragments) => monthsLong[fragments.month - 1];

const tokens = {
  'YYYY': formatYYYY,
  'YY': formatYY,
  'Y': formatY,
  'D': formatD,
  'DD': formatDD,
  'M': formatM,
  'MM': formatMM,
  'MMM': formatMMM,
  'MMMM': formatMMMM,
};

const allToken = /YYYY|YY|Y|DD|D|MMMM|MMM|MM|M/g;

const findToken = (isoString, format) =>
  format.match(allToken) || [];

const format = (isoString, format) => {
  const fragments = toFragments(isoString);

  return findToken(isoString, format).reduce((formattedDate, token) => {
    const replacedToken = tokens[token](fragments);
    return formattedDate.replace(token, replacedToken);
  }, format);
};

import { assertThat, equalTo } from 'hamjest';

const DATE = '2012-02-01T14:15:16';

describe.only(`format ${DATE} with token`, () => {
  it('"YYYY" becomes 2012', () => assertThat(
    format(DATE, 'YYYY'), equalTo('2012')));

  it('"YYYY-YY" becomes 2012-12', () => assertThat(
    format(DATE, 'YYYY-YY'), equalTo('2012-12')));

  it('"Y" 2012', () => assertThat(
    format(DATE, 'Y'), equalTo('2012')));

  it('"YY" becomes 12', () => assertThat(
    format(DATE, 'YY'), equalTo('12')));

  it('"D" becomes 1', () => assertThat(
    format(DATE, 'D'), equalTo('1')));

  it('"DD" becomes 01', () => assertThat(
    format(DATE, 'DD'), equalTo('01')));

  it('"M" becomes 2', () => assertThat(
    format(DATE, 'M'), equalTo('2')));

  it('"MM" becomes 02', () => assertThat(
    format(DATE, 'MM'), equalTo('02')));

  it('"MMM" becomes Feb', () => assertThat(
    format(DATE, 'MMM'), equalTo('Feb')));

  it('"MMMM" becomes February', () => assertThat(
    format(DATE, 'MMMM'), equalTo('February')));
});

