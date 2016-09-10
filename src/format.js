import { doesWeekBelongToPreviousYear } from './getters';
import { toFragments, toIso, daysBetween, getWeekday, getWeekOfYear } from './index';
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
const formatW = (fragments) => getWeekOfYear(toIso(fragments));
const formatWW = (fragments) => leftPad(formatW(fragments));
const formatGGGG = (fragments) => {
  if(doesWeekBelongToPreviousYear(toIso(fragments))) {
    return `${fragments.year - 1}`;
  }
  return formatYYYY(fragments)
};
const formatGG = (fragments) => formatGGGG(fragments).slice(-2);

const formatH = (fragments) => `${fragments.hour}`;
const formatHH = (fragments) => leftPad(formatH(fragments));

const formatm = (fragments) => `${fragments.minute}`;
const formatmm = (fragments) => leftPad(formatm(fragments));

const formats = (fragments) => `${Math.floor(fragments.second)}`;
const formatss = (fragments) => leftPad(formats(fragments));

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
  'W': formatW,
  'WW': formatWW,
  'GG': formatGG,
  'GGGG': formatGGGG,
  'H': formatH,
  'HH': formatHH,
  'm': formatm,
  'mm': formatmm,
  's': formats,
  'ss': formatss,
};

const allToken = Object
  .keys(tokens)
  .sort((a, b) => b.length - a.length)
  .join('|');

const tokenRegex = new RegExp(allToken, 'g');

const findToken = (isoString, format) =>
format.match(tokenRegex) || [];

export const format = (isoString, format) => {
  const fragments = toFragments(isoString);

  return findToken(isoString, format).reduce((formattedDate, token) => {
    const replacedToken = tokens[token](fragments);
    return formattedDate.replace(token, replacedToken);
  }, format);
};
