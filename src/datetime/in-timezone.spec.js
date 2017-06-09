import { assertThat, equalTo } from 'hamjest';
import loadTimezone from './load-timezone';
import vienna from '../data/timezones/europe/vienna.json';
import newYork from '../data/timezones/america/new_york.json';

import inTimezone from './in-timezone';

describe('inTimezone', () => {
  before(() => {
    loadTimezone(vienna);
    loadTimezone(newYork);
  });

  it('2000-01-01T00:00:00+00:00 in Europe/Vienna', () => {
    assertThat(inTimezone('Europe/Vienna', '2000-01-01T00:00:00+00:00'),
      equalTo('2000-01-01T01:00:00+01:00'));
  });

  it('2000-01-01T00:00:00+00:00 in Europe/Vienna', () => {
    assertThat(inTimezone('Europe/Vienna', '2000-06-01T00:00:00+00:00'),
      equalTo('2000-06-01T02:00:00+02:00'));
  });

  it('2000-01-01T00:00:00+00:00 in America/New_York', () => {
    assertThat(inTimezone('America/New_York', '2000-01-01T00:00:00+00:00'),
      equalTo('1999-12-31T19:00:00-05:00'));
  });

  it('2000-01-01T01:00:00+01:00 in Europe/Vienna', () => {
    assertThat(inTimezone('Europe/Vienna', '2000-01-01T01:00:00+01:00'),
      equalTo('2000-01-01T01:00:00+01:00'));
  });
});

