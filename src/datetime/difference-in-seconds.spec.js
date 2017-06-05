import { assertThat, equalTo } from 'hamjest';
import differenceInSeconds from './difference-in-seconds';

describe('differenceInSeconds', () => {
  it('seconds between T10:01 and T10:00 is 60 seconds', () => assertThat(
    differenceInSeconds('T10:01', 'T10:00'), equalTo(60)));

  it('seconds between T10:01 and T10:00:01 is 59 seconds', () => assertThat(
    differenceInSeconds('T10:01', 'T10:00:01'), equalTo(59)));

  it('seconds between T11:00 and T10:59:00 is 60 seconds', () => assertThat(
    differenceInSeconds('T11:00', 'T10:59'), equalTo(60)));

  it('there are 60 seconds between 2000-01-02T00:00 and 2000-01-01T23:59', () => assertThat(
    differenceInSeconds('2000-01-02T00:00', '2000-01-01T23:59'), equalTo(60)));

  it('can be curried', () => assertThat(
    differenceInSeconds('2000-01-02T00:00')('2000-01-01T23:59'), equalTo(60)));

  it('unix timestamp 1700-01-01T00:00:00 responds 1699-12-31T23:59', () => assertThat(
    differenceInSeconds('1699-12-31T23:59', '1700-01-01T00:00:00'), equalTo(-60)));

  describe.skip('for now as the rest of zeitgeist cant\'t  handles leap seconds', () => {
    it('there are 2 seconds between 1972-07-01T00:00:00 and 1972-06-30T23:59:59', () => assertThat(
      differenceInSeconds('1972-07-01T00:00:00', '1972-06-30T23:59:59'), equalTo(2)));
  });
});

