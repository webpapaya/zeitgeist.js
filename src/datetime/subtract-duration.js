import { pipe, curry } from '../utils';
import { toFragments as toDurationFragments } from '../duration/index';

import addDays from './add-days';
import addMonths from './add-months';
import addYears from './add-years';
import addHours from './add-hours';
import addMinutes from './add-minutes';
import addSeconds from './add-seconds';

// TODO: probably check validity of isoDuration and isoDatetime
const subtractDuration = curry((isoDuration, isoDatetime) => {
  const { years, months, days, hours, minutes, seconds } = toDurationFragments(isoDuration);

  return pipe(
    addDays(days * -1),
    addMonths(months * -1),
    addYears(years * -1),
    addHours(hours * -1),
    addMinutes(minutes * -1),
    addSeconds(seconds * -1),
  )(isoDatetime);
});

export default subtractDuration;
