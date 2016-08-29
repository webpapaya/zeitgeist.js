import { assertThat, equalTo } from 'hamjest';

const parseIso = (isoString) => {
  const [year, month, day] = isoString.split('-');
  return {
    year: parseInt(year),
    month: month ? parseInt(month) : 1,
    day: day ? parseInt(day) : 1,
  };
};

describe('parseIso', () => {
  describe('`2000` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000').day, equalTo(1)));
  });

  describe('`2000-01` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000-01').day, equalTo(1)));
  });

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000-01-01').day, equalTo(1)));
  });
});
