import { assertThat, equalTo } from 'hamjest';
import '../data/timezones/europe/vienna';
import '../data/timezones/america/new_york';

import inTimezone from './in-timezone';

describe('inTimezone', () => {
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

