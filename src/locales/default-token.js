import { doesWeekBelongToPreviousYear } from '../getters';
import { toIso, daysBetween, getWeekday, getWeekOfYear } from '../index';
import { leftPad } from '../utils';

const formatYYYY = (fragments) => `${fragments.year}`;
const formatYY = (fragments) => formatYYYY(fragments).slice(-2);
const formatY = (fragments) => formatYYYY(fragments);

const formatD = (fragments) => `${fragments.day}`;
const formatDD = (fragments) => leftPad(formatD(fragments));
const formatDDD = (fragments) => daysBetween(`${fragments.year}-01-01`, toIso(fragments)) + 1;
const formatDDDD = (fragments) => leftPad(formatDDD(fragments), 3);

const formatM = (fragments) => `${fragments.month}`;
const formatMM = (fragments) => leftPad(formatM(fragments));
const formatMMM = (fragments, { monthsShort }) => monthsShort[fragments.month - 1];
const formatMMMM = (fragments, { monthsLong }) => monthsLong[fragments.month - 1];

const formatd = (fragments) => getWeekday(toIso(fragments));
const formatdd = (fragments) => leftPad(formatd(fragments));
const formatddd = (fragments, { weekdaysShort }) => weekdaysShort[formatd(fragments) - 1];
const formatdddd = (fragments, { weekdaysLong }) => weekdaysLong[formatd(fragments) - 1];

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

export const token = {
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