import { assertThat, equalTo } from 'hamjest';

const findTimeSeperator = (isoString) => {
  if(isoString.indexOf('T') !== -1) { return 'T'; }
  return ' ';
};

const seperateDateAndTimeComponents = (isoString) => {
  const timeSeperator = findTimeSeperator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeperator);
  return { dateComponent, timeComponent };
};

const parseIso = (isoString) => {
  const { dateComponent, timeComponent } = seperateDateAndTimeComponents(isoString);

  const [year, month, day] = dateComponent.split('-');
  const [hour, minute] = timeComponent.split(':');
  return {
    year: parseInt(year),
    month: month ? parseInt(month) : 1,
    day: day ? parseInt(day) : 1,
    hour: parseInt(hour),
    minute: parseInt(minute),
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

  describe('`2000-01-01` responds', () => {
    it('year 2000', () => assertThat(
      parseIso('2000-01-01').year, equalTo(2000)));

    it('month 1', () => assertThat(
      parseIso('2000-01-01').month, equalTo(1)));

    it('day 1', () => assertThat(
      parseIso('2000-01-01').day, equalTo(1)));
  });

  describe('`2000-01-01T10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01T10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01T10:20').minute, equalTo(20)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01 10:20').minute, equalTo(20)));
  });
});
