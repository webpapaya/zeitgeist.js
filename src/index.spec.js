import { assertThat, equalTo } from 'hamjest';

const parseIso = (isoString) => {
  const [year, month] = isoString.split('-');
  return {
    year: parseInt(year),
    month: parseInt(month),
  };
};

describe('parseIso', () => {
  it('`2000` responds year 2000', () => assertThat(
    parseIso('2000').year, equalTo(2000)));

  it('`2000-01` responds month 1', () => assertThat(
    parseIso('2000-01').month, equalTo(1)));
});
