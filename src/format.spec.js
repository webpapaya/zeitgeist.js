import { toFragments } from './index';


const formatYYYY = (fragments) => `${fragments.year}`;
const formatYY = (fragments) => formatYYYY(fragments).slice(-2);
const formatY = (fragments) => formatYYYY(fragments);

const tokens = {
  'YYYY': formatYYYY,
  'YY': formatYY,
  'Y': formatY
};

const allToken = /YYYY|YY|Y/g;

const findToken = (isoString, format) =>
  format.match(allToken);

const format = (isoString, format) => {
  const fragments = toFragments(isoString);

  return findToken(isoString, format).reduce((formattedDate, token) => {
    const replacedToken = tokens[token](fragments);
    return formattedDate.replace(token, replacedToken);
  }, format);
};

import { assertThat, equalTo } from 'hamjest';
describe.only('format a date', () => {
  describe('Token "YYYY"', () => {
    it('2012-01-01 becomes 2012', () => assertThat(
      format('2012-01-01', 'YYYY'), equalTo('2012')));
  });

  describe('Token "YYYY-YY"', () => {
    it('2012-01-01 becomes 2012-12', () => assertThat(
      format('2012-01-01', 'YYYY-YY'), equalTo('2012-12')));
  });

  describe('Token "Y"', () => {
    it('2012-01-01 becomes 2012', () => assertThat(
      format('2012-01-01', 'Y'), equalTo('2012')));
  });

  describe('Token "YY"', () => {
    it('2012-01-01 becomes 12', () => assertThat(
      format('2012-01-01', 'YY'), equalTo('12')));
  });
});

