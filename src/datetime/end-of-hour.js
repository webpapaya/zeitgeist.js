import { pipe } from './../utils';
import { roundDecorator } from './decorator';

import subtractMinutes from './subtract-minutes';
import endOfMinute from './end-of-minute';
import ceilHour from './ceil-hours';

const endOfHour = (isoDatetime) => pipe(
  ceilHour,
  subtractMinutes(1),
  endOfMinute,
)(isoDatetime);

export default roundDecorator(endOfHour);
