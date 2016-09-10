import { toFragments, toIso, daysBetween, getWeekday } from './index';
import { leftPad } from './utils';


const weekdaysLong = 'Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
const weekdaysShort = 'Mon Tue Wed Thu Fri Sat Sun'.split(' ');

const monthsLong = 'January February March April May June July August September October November December'.split(' ');
const monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

const formatYYYY = (fragments) => `${fragments.year}`;
const formatYY = (fragments) => formatYYYY(fragments).slice(-2);
const formatY = (fragments) => formatYYYY(fragments);

const formatD = (fragments) => `${fragments.day}`;
const formatDD = (fragments) => leftPad(formatD(fragments));
const formatDDD = (fragments) => daysBetween(`${fragments.year}-01-01`, toIso(fragments)) + 1;
const formatDDDD = (fragments) => leftPad(formatDDD(fragments), 3);

const formatM = (fragments) => `${fragments.month}`;
const formatMM = (fragments) => leftPad(formatM(fragments));
const formatMMM = (fragments) => monthsShort[fragments.month - 1];
const formatMMMM = (fragments) => monthsLong[fragments.month - 1];

const formatd = (fragments) => getWeekday(toIso(fragments));
const formatdd = (fragments) => leftPad(formatd(fragments));
const formatddd = (fragments) => weekdaysShort[formatd(fragments) - 1];
const formatdddd = (fragments) => weekdaysLong[formatd(fragments) - 1];

const formatE = (fragments) => getWeekday(toIso(fragments));

const tokens = {
  'Y': formatY,
  'YY': formatYY,
  'YYYY': formatYYYY,
  'D': formatD,
  'DD': formatDD,
  'DDD': formatDDD,
  'DDDD': formatDDDD,
  'M': formatM,
  'MM': formatMM,
  'MMM': formatMMM,
  'MMMM': formatMMMM,
  'd': formatd,
  'dd': formatdd,
  'ddd': formatddd,
  'dddd': formatdddd,
  'E': formatE,
};

const allToken = Object
    .keys(tokens)
    .sort((a, b) => b.length - a.length)
    .join('|');

const tokenRegex = new RegExp(allToken, 'g');

const findToken = (isoString, format) =>
  format.match(tokenRegex) || [];

const format = (isoString, format) => {
  const fragments = toFragments(isoString);

  return findToken(isoString, format).reduce((formattedDate, token) => {
    const replacedToken = tokens[token](fragments);
    return formattedDate.replace(token, replacedToken);
  }, format);
};

import { assertThat, equalTo } from 'hamjest';

const DATE = '2012-02-01T14:15:16+01:00RP1Y';

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

  it('"DDD" becomes 32', () => assertThat(
    format(DATE, 'DDD'), equalTo('32')));

  it('"DDDD" becomes 032', () => assertThat(
    format(DATE, 'DDDD'), equalTo('032')));

  it('"M" becomes 2', () => assertThat(
    format(DATE, 'M'), equalTo('2')));

  it('"MM" becomes 02', () => assertThat(
    format(DATE, 'MM'), equalTo('02')));

  it('"MMM" becomes Feb', () => assertThat(
    format(DATE, 'MMM'), equalTo('Feb')));

  it('"MMMM" becomes February', () => assertThat(
    format(DATE, 'MMMM'), equalTo('February')));

  it('"d" becomes 3', () => assertThat(
    format(DATE, 'd'), equalTo('3')));

  it('"dd" becomes 03', () => assertThat(
    format(DATE, 'dd'), equalTo('03')));

  it('"ddd" becomes Wed', () => assertThat(
    format(DATE, 'ddd'), equalTo('Wed')));

  it('"dddd" becomes Wednesday', () => assertThat(
    format(DATE, 'dddd'), equalTo('Wednesday')));

  it('"E" becomes 3', () => assertThat(
    format(DATE, 'E'), equalTo('3')));
});

