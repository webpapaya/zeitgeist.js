import { pipe } from './../utils';
import { roundDecorator } from './decorator';

import subtractDays from './subtract-days';
import endOfDay from './end-of-day';
import ceilMonth from './ceil-months';

export const endOfMonth = (isoDatetime) => pipe(
  ceilMonth,
  subtractDays(1),
  endOfDay,
)(isoDatetime);

export default roundDecorator(endOfMonth);
