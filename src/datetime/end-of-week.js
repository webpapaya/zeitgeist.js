import { pipe } from './../utils';
import { ceilWeek } from './calculations/ceil';
import { roundDecorator } from './decorator';

import subtractDays from './subtract-days';
import endOfDay from './end-of-day';

export const endOfWeek = (isoDatetime) => pipe(
  ceilWeek,
  subtractDays(1),
  endOfDay,
)(isoDatetime);

export default roundDecorator(endOfWeek);
