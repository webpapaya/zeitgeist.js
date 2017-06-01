import { pipe } from './../utils';
import { ceilDay } from './calculations/ceil';
import { roundDecorator } from './decorator';

import subtractHours from './subtract-hours';
import endOfHour from './end-of-hour';

const endOfDay = (isoDatetime) => pipe(
  ceilDay,
  subtractHours(1),
  endOfHour,
)(isoDatetime);

export default roundDecorator(endOfDay);
