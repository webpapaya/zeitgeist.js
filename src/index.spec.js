import { assertThat, equalTo } from 'hamjest';

const TIME_SEPARATOR_1 = 'T';
const TIME_SEPARATOR_2 = ' ';

const findTimeSeperator = (isoString) => {
  if(isoString.indexOf(TIME_SEPARATOR_1) !== -1) { return TIME_SEPARATOR_1; }
  return TIME_SEPARATOR_2;
};

const seperateDateAndTimeComponents = (isoString) => {
  const timeSeperator = findTimeSeperator(isoString);
  const [dateComponent, timeComponent = ''] = isoString.split(timeSeperator);
  return { dateComponent, timeComponent };
};

const parseIso = (isoString) => {
  const { dateComponent, timeComponent } = seperateDateAndTimeComponents(isoString);

  const [year, month, day] = dateComponent.split('-');
  const [hour, minute, second] = timeComponent.split(':');
  return {
    year: parseInt(year),
    month: month ? parseInt(month) : 1,
    day: day ? parseInt(day) : 1,
    hour: hour ? parseInt(hour) : 0,
    minute: parseInt(minute),
    second: second ? parseInt(second) : 0,
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

    it('hour 0', () => assertThat(
      parseIso('2000').hour, equalTo(0)));
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

  describe('`2000-01-01T10:20:30` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01T10:20:30').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01T10:20:30').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      parseIso('2000-01-01T10:20:30').second, equalTo(30)));
  });

  describe('`2000-01-01 10:20` responds', () => {
    it('`hour is 10`', () => assertThat(
      parseIso('2000-01-01 10:20').hour, equalTo(10)));

    it('`minute is 20`', () => assertThat(
      parseIso('2000-01-01 10:20').minute, equalTo(20)));

    it('`second is 0`', () => assertThat(
      parseIso('2000-01-01 10:20').second, equalTo(0)));
  });
});
