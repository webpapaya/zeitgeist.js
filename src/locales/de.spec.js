import { assertThat, equalTo } from 'hamjest';
import { format } from '../index';
import { locale } from './de';


const testCases = [
  ['dddd, Do MMMM YYYY, h:mm:ss a',      'Sonntag, 14. Februar 2010, 3:25:50 pm'],
  ['ddd, hA',                            'So., 3PM'],
  ['M Mo MM MMMM MMM',                   '2 2. 02 Februar Febr.'],
  ['YYYY YY',                            '2010 10'],
  ['D Do DD',                            '14 14. 14'],
  ['d do dddd ddd dd',                   '0 0. Sonntag So. So'],
  ['DDD DDDo DDDD',                      '45 45. 045'],
  ['w wo ww',                            '6 6. 06'],
  ['h hh',                               '3 03'],
  ['H HH',                               '15 15'],
  ['m mm',                               '25 25'],
  ['s ss',                               '50 50'],
  ['a A',                                'pm PM'],
  ['[the] DDDo [day of the year]',       'the 45. day of the year'],
  ['LTS',                                '15:25:50'],
  ['L',                                  '14.02.2010'],
  ['LL',                                 '14. Februar 2010'],
  ['LLL',                                '14. Februar 2010 15:25'],
  ['LLLL',                               'Sonntag, 14. Februar 2010 15:25'],
  ['l',                                  '14.2.2010'],
  ['ll',                                 '14. Febr. 2010'],
  ['lll',                                '14. Febr. 2010 15:25'],
  ['llll',                               'So., 14. Febr. 2010 15:25']
];

const DATE = '2010-01-14T15:25:50.125';
describe.skip(`local de formats ${DATE}`, () => {
  testCases.forEach(([pattern, result]) => {
    it(`WITH pattern ${pattern} to ${result}`, () => assertThat(
      format(DATE, pattern, locale), equalTo(result)));
  });
});
