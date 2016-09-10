import { assertThat, equalTo } from 'hamjest';
import { format } from './format';

const DATE = '2012-02-01T09:08:07.123';

describe(`format ${DATE} with token`, () => {
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

  it('"W" becomes 3', () => assertThat(
    format(DATE, 'W'), equalTo('5')));

  it('"WW" becomes 03', () => assertThat(
    format(DATE, 'WW'), equalTo('05')));

  it('"GGGG" becomes 2012', () => assertThat(
    format(DATE, 'GGGG'), equalTo('2012')));

  it('"GG" becomes 12', () => assertThat(
    format(DATE, 'GG'), equalTo('12')));

  it('"H" becomes 0', () => assertThat(
    format(DATE, 'H'), equalTo('9')));

  it('"HH" becomes 09', () => assertThat(
    format(DATE, 'HH'), equalTo('09')));

  it('"m" becomes 8', () => assertThat(
    format(DATE, 'm'), equalTo('8')));

  it('"mm" becomes 08', () => assertThat(
    format(DATE, 'mm'), equalTo('08')));

  it('"s" becomes 7', () => assertThat(
    format(DATE, 's'), equalTo('7')));

  it('"ss" becomes 07', () => assertThat(
    format(DATE, 'ss'), equalTo('07')));
});

describe('format 2000-01-01 with token', () => {
  it('GGGG responds 1999, because week belongs to previous year', () => assertThat(
    format('2000-01-01', 'GGGG'), equalTo('1999')));

  it('YYYY responds 2000', () => assertThat(
    format('2000-01-01', 'YYYY'), equalTo('2000')));
});



