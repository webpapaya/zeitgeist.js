[![Build Status](https://travis-ci.org/webpapaya/zeitgeist.js.svg?branch=master)](https://travis-ci.org/webpapaya/zeitgeist.js) 

# This Package is not production ready yet.

# Datetime
## Usage

```js
import {
  FEBRUARY,
  DAYS_IN_MONTHS,
} from './constants';

import {
  toFragments,
  removeTimeComponent,
  removeDateComponent,
} from './transformations/index';

import { isEmpty } from '../utils';

const isLeapMonth = (isoString, month) =>
  month === FEBRUARY && isLeapYear(isoString);

export const daysInYear = (isoString) => isLeapYear(isoString) ? 366 : 365;

export const daysInMonth = (isoString) => {
  const { month = 1 } = toFragments(isoString);
  if (isLeapMonth(isoString, month)) { return 29; }
  return DAYS_IN_MONTHS[month];
};

export const isLeapYear = (isoString) => {
  const { year } = toFragments(isoString);
  const dividableBy4 = year % 4 === 0;
  const dividableBy100 = year % 100 === 0;
  const dividableBy400 = year % 400 === 0;

  return (dividableBy4 && !dividableBy100) || dividableBy400;
};

export const isLastDayOfMonth = (isoString) => {
  const { day } = toFragments(isoString);
  return daysInMonth(isoString) === day;
};

export const isFirstDayOfMonth = (isoString) => {
  const { day } = toFragments(isoString);
  return day === 1;
};

export const containsDateComponent = (isoString) => !isEmpty(removeTimeComponent(isoString));
export const containsTimeComponent = (isoString) => !isEmpty(removeDateComponent(isoString));

export {
  toIso,
  toFragments,
  toIsoDate,
  toIsoTime,
  toFloat,

  removeTimeComponent,
  removeDateComponent,

  fromJulianDay,
  toJulianDay,

  fromUnixTimestamp,
  toUnixTimestamp,

  toJsDate,
  fromJsDate,
} from './transformations/index';

export {
  normalize,

  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,

  datesBetween,
  daysBetween,

  addDuration,
  addSeconds,
  addSeconds as addSecond,
  addMinutes,
  addMinutes as addMinute,
  addHours,
  addHours as addHour,
  addDays,
  addDays as addDay,
  addMonths,
  addMonths as addMonth,
  addYears,
  addYears as addYear,

  subtractDuration,
  subtractSeconds,
  subtractSeconds as subtractSecond,
  subtractMinutes,
  subtractMinutes as subtractMinute,
  subtractHours,
  subtractHours as subtractHour,
  subtractDays,
  subtractDays as subtractDay,
  subtractMonths,
  subtractMonths as subtractMonth,
  subtractYears,
  subtractYears as subtractYear,

  floorSecond,
  floorSecond as floorSeconds,
  floorMinute,
  floorMinute as floorMinutes,
  floorHour,
  floorHour as floorHours,
  floorDay,
  floorDay as floorDays,
  floorWeek,
  floorWeek as floorWeeks,
  floorMonth,
  floorMonth as floorMonths,
  floorYear,
  floorYear as floorYears,

  ceilSecond,
  ceilSecond as ceilSeconds,
  ceilMinute,
  ceilMinute as ceilMinutes,
  ceilHour,
  ceilHour as ceilHours,
  ceilDay,
  ceilDay as ceilDays,
  ceilWeek,
  ceilWeek as ceilWeeks,
  ceilMonth,
  ceilMonth as ceilMonths,
  ceilYear,
  ceilYear as ceilYears,

  roundSecond,
  roundSecond as roundSeconds,
  roundMinute,
  roundMinute as roundMinutes,
  roundHour,
  roundHour as roundHours,
  roundDay,
  roundDay as roundDays,
  roundMonth,
  roundMonth as roundMonths,
  roundYear,
  roundYear as roundYears,

  startOfSecond,
  startOfMinute,
  startOfHour,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,

  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
} from './calculations/index';

export {
  getWeekday,
  getWeekOfYear,
  getDayOfYear,

  getYear,
  getMonth,
  getDay,
  getHour,
  getMinute,
  getSecond,
} from './getters';

export {
  isBetween,
  isBefore,
  isAfter,
  isSameOrAfter,
  isSameOrBefore,

  isSame,
  isSameYear,
  isSameMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
} from './compare';

export { format } from './format';
```
# Durations
An immutable duration library based on the ISO-8601 format for durations. 

## Usage

### Calculations

```md
Note: Due to JavaScripts floating point precision issue milliseconds and 
microseconds can't be handled correctly by this library. In the future
there will be a high precision mode which will require decimal.js or
any other arbitrary-precision decimal library.
```


### Public API

#### Finders

All finders accept an ISO-8601 duration string and respond a number. eg.: `findSeconds('PT1S') // => 1``

```js
export {
  findSeconds,
  findMinutes,
  findHours,
  findDays,
  findWeeks,
  findMonths,
  findYears,
};
```


#### Calculations

All calculations accept an ISO-8601 duration string and respond an ISO-8601 duration string. eg.: `addSeconds(1, 'PT0S') // => 'PT1S'`

```js
export {
  addMicroseconds,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,

  subtractMilliseconds,
  subtractMicroseconds,
  subtractSeconds,
  subtractMinutes,
  subtractHours,
  subtractDays,
  subtractWeeks,
  subtractMonths,
  subtractYears,
};
```


#### Conversions

All conversions accept an ISO-8601 duration string and respond a number. eg.: `asSeconds(1, 'PT1M1S') // => 61`

```js
export {
  asMicroseconds,
  asMilliseconds,
  asSeconds,
  asMinutes,
  asHours,
  // NOTE: other conversions are not possible see: Precision Issues
};
```


#### Transformations

Transformations are used to convert an ISO string to an object and the other way round.

```js
import { toFragments } from 'pomeranian-durations';

toFragments('PT1S') // { ..., hours: 0, seconds: 1, ... }
```

```js
import { toIso } from 'pomeranian-durations';

toIso({ seconds: 1 }) // 'PT1S'
```


#### Wrapper

The wrapper object is an immutable convenience object which makes multiple calculations on the same object easier.
 
```js
import { addSeconds } from 'pomeranian-duration'

const duration = addSeconds('PT0S', 1); // => 'PT1S';
```

```js
import { fromIso } from 'pomeranian-duration'

const duration = fromIso('PT0S').addSeconds(1).toIso(); // => 'PT1S';
```

Pomeranian is completely immutable.

```js
import { fromFragments } from 'pomeranian-duration'

const duration1 = fromIso({ seconds: 0 });
const duration2 = duration1.addSeconds(1);

console.log(duration1 === duration2); // => false
```

## Precision Issues
Because date components (years, months, weeks, days) can't be converted to other unites without date and timezone information, `pomeranian-durations`
doesn't support them yet. To do precise arithmetic operations it is recommended to avoid years, months, weeks and days completely when using durations.

For more information have a look at http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm
