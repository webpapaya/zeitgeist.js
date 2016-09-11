import { assertThat, equalTo, hasProperty } from 'hamjest';
import { readdirSync } from 'fs';

describe.only('locale', () => {
  readdirSync('./src/locales')
    .filter((filename) => !filename.startsWith('default'))
    .filter((filename) => filename.indexOf('spec') === -1)
    .forEach((filename) => {
      const localeName = filename.replace('.js', '');
      const { locale } = require(`./${localeName}`);

      describe(`${localeName}`, () => {
        describe('monthsLong', () => {
          it('exists', () => assertThat(
            locale, hasProperty('monthsLong')));

          it('contains 12 entries', () => assertThat(
            locale.monthsLong.length, equalTo(12)));
        });

        describe('monthsShort', () => {
          it('exists', () => assertThat(
            locale, hasProperty('monthsShort')));

          it('contains 12 entries', () => assertThat(
            locale.monthsShort.length, equalTo(12)));
        });

        describe('weekdaysLong', () => {
          it('exists', () => assertThat(
            locale, hasProperty('weekdaysLong')));

          it('contains 7 entries', () => assertThat(
            locale.weekdaysLong.length, equalTo(7)));
        });

        describe('weekdaysShort', () => {
          it('exists', () => assertThat(
            locale, hasProperty('weekdaysShort')));

          it('contains 7 entries', () => assertThat(
            locale.weekdaysShort.length, equalTo(7)));
        });
      });
    });
});



