import { pipe } from './../utils';

import { roundDecorator } from './decorator';

import subtractDays from './subtract-days';
import endOfDay from './end-of-day';
import ceilWeek from './ceil-week';

export const endOfWeek = (isoDatetime) => pipe(
  ceilWeek,
  subtractDays(1),
  endOfDay,
)(isoDatetime);

export default roundDecorator(endOfWeek);
