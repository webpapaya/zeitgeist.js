import { pipe } from './../utils';
import { ceilMonth } from './calculations/ceil';
import { roundDecorator } from './decorator';

import subtractDays from './subtract-days';
import endOfDay from './end-of-day';

export const endOfMonth = (isoDatetime) => pipe(
  ceilMonth,
  subtractDays(1),
  endOfDay,
)(isoDatetime);

export default roundDecorator(endOfMonth);
