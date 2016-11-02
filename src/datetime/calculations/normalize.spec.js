import { assertThat, equalTo } from 'hamjest';
import { normalize } from '../index';

describe('normalize', () => {
  it('2001-01-01T00:01:-01 gets normalized to 2001-01-01T00:01:00', () => assertThat(
    normalize('2001-01-01T00:01:-01'), equalTo('2001-01-01T00:00:59')));

  it('2001-01-01T00:00:60 gets normalized to 2001-01-01T00:01:00', () => assertThat(
    normalize('2001-01-01T00:00:60'), equalTo('2001-01-01T00:01:00')));

  it('2001-01-01T00:00:90 gets normalized to 2001-01-01T00:01:30', () => assertThat(
    normalize('2001-01-01T00:00:90'), equalTo('2001-01-01T00:01:30')));

  it('`I\'m invalid` gets normalized to Invalid Date', () => assertThat(
    normalize('I\'m invalid'), equalTo('Invalid Date')));
});
