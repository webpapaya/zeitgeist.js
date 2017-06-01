import { pipe } from './../utils';
import { ceilHour } from './calculations/ceil';
import { roundDecorator } from './decorator';

import subtractMinutes from './subtract-minutes';
import endOfMinute from './end-of-minute';

const endOfHour = (isoDatetime) => pipe(
  ceilHour,
  subtractMinutes(1),
  endOfMinute,
)(isoDatetime);

export default roundDecorator(endOfHour);
