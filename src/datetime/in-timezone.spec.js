import { assertThat, equalTo } from 'hamjest';
import loadTimezone from './load-timezone';
import vienna from '../data/timezones/europe/vienna.json';
import newYork from '../data/timezones/america/new_york.json';

import TIMEZONE_REGISTRY from './_internal/timezone-registry';

import { dropTimezone } from './index';
import { compose, curry } from '../utils';



import toUnixTimestamp from './to-unix-timestamp';
import subtractMinutes from './subtract-minutes';
import toUtc from './to-utc';

const minutesToTimezoneOffset = (offset) => {
  const hours = Math.floor(offset / 60);
  const minutes = offset - hours * 60;

  return hours > 0
    ? `-${leftPad(Math.abs(hours))}:${leftPad(minutes)}`
    : `+${leftPad(Math.abs(hours))}:${leftPad(minutes)}`
  ;
};

const setTimezoneOffset = curry((timezoneOffset, isoDatetime) => {
  const dateTimeWithoutOffset = dropTimezone(isoDatetime);
  return `${dateTimeWithoutOffset}${timezoneOffset}`;
});

const leftPad = (value) => `00${value}`.slice(-2);

const inTimezone = (timezoneName, isoDatetime) => {
  const zone = TIMEZONE_REGISTRY[timezoneName.toLowerCase()]; // TODO: handle not found zone
  const unixTimestamp = toUnixTimestamp(isoDatetime);

  const possibleOffsets = zone.filter(({ until }) => (until >= unixTimestamp && until !== null));
  const { offset } = possibleOffsets[0];

  const timezoneOffset = minutesToTimezoneOffset(offset);

  return compose(
    toUtc,
    setTimezoneOffset(timezoneOffset),
    subtractMinutes(offset)
  )(isoDatetime);
};

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

