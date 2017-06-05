[![Build Status](https://travis-ci.org/webpapaya/zeitgeist.js.svg?branch=master)](https://travis-ci.org/webpapaya/zeitgeist.js) 

# This Package is not production ready yet.

# TODOs before first release:
- [ ] Add compare functions
  - isBefore(a, b)
  - isAfter(a, b)
  - isSame(a, b)
  - isBeforeOrEqual(a, b)
  - isAfterOrEqual(a, b)
- [ ] Add toPrecision functions (think about naming again)
  - toPrecisionMicroseconds(isoDatetime)
  - toPrecisionMilliseconds(isoDatetime)
  - toPrecisionSeconds(isoDatetime)
  - toPrecisionMinutes(isoDatetime)
  - toPrecisionHours(isoDatetime)
  - toPrecisionDays(isoDatetime)
  - toPrecisionMonths(isoDatetime)
  - toPrecisionYears(isoDatetime)
- [ ] format(format, isoDatetime)
  - 
- [ ] setTimezoneOffset(time, isoDatetime)
- [ ] getTimezoneOffset(time)
- [ ] setTimezoneOffsetAsDuration(duration, isoDatetime)
- [ ] getTimezoneOffsetAsDuration(duration)
- [ ] toTimezoneOffset
- [ ] toTimezone (this will be fun)


# Datetime

## Transformations

Convert dates from one representation to another.
 
```js
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
```

## Arithmetic calculations

All calculations are immutable and can be either called in singular or
plural (eg. addSecond, addSeconds). They take the amound to be 
added/subtracted as the first argument and an ISO-8601 string as the 
second argument.

```js
addSeconds(1, '2000-01-01T00:00:00'); // => '2000-01-01T00:00:01'
```
 
All arithmetic calculations are curried which enables intermediate 
functions to be defined easily. If you're writing a lecture scheduling 
system where one lecture lasts 1.5 hours you can easily define your own 
addLectureHour function.

```js
const addLectureHour = addHours(1.5);
addLectureHour('2000-01-01T00:00:00'); // => '2000-01-01T01:50:00'
```

As all calculations are curried, so that functional composition is also 
possible.

```js
import { pipe } from 'ramda';

const addLectureHour = pipe(
  addMinutes(30),    
  addHours(1),
);

addLectureHour('2000-01-01T00:00:00'); // => '2000-01-01T01:50:00'
```

### Public Functions

```js
import {
  addMicroseconds,
  addMicrosecond,
  addMilliseconds,
  addMillisecond,
  addSeconds,
  addSecond,
  addMinutes,
  addMinute,
  addHours,
  addHour,
  addDays,
  addDay,
  addWeeks,
  addWeek,
  addMonths,
  addMonth,
  addYears,
  addYear,

  subtractMilliseconds,
  subtractMillisecond,
  subtractMicroseconds,
  subtractMicrosecond,
  subtractSeconds,
  subtractSecond,
  subtractMinutes,
  subtractMinute,
  subtractHours,
  subtractHour,
  subtractDays,
  subtractDay,
  subtractWeeks,
  subtractWeek,
  subtractMonths,
  subtractMonth,
  subtractYears,
  subtractYear,
} from 'zeitgeist/datetime';
```

## Round/Ceil/Floor

Zeitgeist allows you to round/ceil/floor dates.

```js
floorHour('2000-01-01T11:12:23'); // => '2000-01-01T11:00:00' 
```

### Public Functions
 
```js
import {
  floorSecond,
  floorSeconds,
  floorMinute,
  floorMinutes,
  floorHour,
  floorHours,
  floorDay,
  floorDays,
  floorWeek,
  floorWeeks,
  floorMonth,
  floorMonths,
  floorYear,
  floorYears,

  ceilSecond,
  ceilSeconds,
  ceilMinute,
  ceilMinutes,
  ceilHour,
  ceilHours,
  ceilDay,
  ceilDays,
  ceilWeek,
  ceilWeeks,
  ceilMonth,
  ceilMonths,
  ceilYear,
  ceilYears,

  roundSecond,
  roundSeconds,
  roundMinute,
  roundMinutes,
  roundHour,
  roundHours,
  roundDay,
  roundDays,
  roundMonth,
  roundMonths,
  roundYear,
  roundYears,
  
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
} from 'zeitgeist/datetime';
```
 
## Getters

Getting specific units out of an ISO-8601 string works as well. It accepts 
an ISO-8601 date string as first argument.

```js
getYear('2000-01-01'); // => 2000
```

### Public Functions

```js
import {
  getWeekday,
  getWeekOfYear,
  getDayOfYear,

  getYear,
  getMonth,
  getDay,
  getHour,
  getMinute,
  getSecond,
} from 'zeitgeist/datetime';
```

## Comparison

Compare takes two ISO-8601 date strings. They accept two ISO-8601 date
strings as their arguments.

```js
isBefore('2000-01-01', '2000-02-03'); // => true
isBetween({from: '2000', to: '2001'}, '2000-02-31'); // => true
```

### Public Functions
```js
import {
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
} from 'zeitgeist/datetime';
```

## Time-Between
Knowing how much time there is between two given dates might be needed
in your application.

```js
hoursBetween('T11:00', 'T10:00'); // => 1
daysBetween('2000-01-01', '2000-01-02'); // => 1

// Dates between includes the first and last date.
datesBetween('2000-01-01', '2000-01-02'); // => ['2000-01-01', '2000-01-02']
```

### Public functions

```js
import {
  microsecondsBetween,
  millisecondsBetween,
  secondsBetween,
  minutesBetween,
  hoursBetween,

  datesBetween,
  daysBetween,
} from 'zeitgeist/datetime';
```

## Date normalisation

```js
import { normalize } from 'zeitgeist/datetime';

normalize('2000-13-01'); // => '2001-01-01' 
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


## Contributions

There is still lot to do and fix in order to get to the 
[0.0.1 milestone](https://github.com/webpapaya/zeitgeist.js/milestone/1).
Contributions are very welcome. Just ping me on twitter @webpapaya
or comment in one of the open tickets you want to work on.

