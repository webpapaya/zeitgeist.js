import { assertThat, equalTo } from 'hamjest';

const parseIso = (isoString) => {
  return {
    year: parseInt(isoString)
  };
};

describe('parseIso', () => {
  it('`2000` responds year 2000', () => assertThat(
    parseIso('2000').year, equalTo(2000)));

});
