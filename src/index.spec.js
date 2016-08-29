import { assertThat, equalTo } from 'hamjest';

const parseIso = (isoString) => {
  const [year, month, day] = isoString.split('-');
  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  };
};

describe('parseIso', () => {
  it('`2000` responds year 2000', () => assertThat(
    parseIso('2000').year, equalTo(2000)));

  it('`2000-01` responds month 1', () => assertThat(
    parseIso('2000-01').month, equalTo(1)));

  it('`2000-01-01` responds day 1', () => assertThat(
    parseIso('2000-01-01').day, equalTo(1)));
});
