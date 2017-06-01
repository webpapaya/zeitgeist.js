import { pipe } from './../utils';
import { ceilYear } from './calculations/ceil';
import { roundDecorator } from './decorator';

import subtractMonths from './subtract-months';
import endOfMonth from './end-of-month';

export const endOfYear = (isoDatetime) => pipe(
  ceilYear,
  subtractMonths(1),
  endOfMonth,
)(isoDatetime);

export default roundDecorator(endOfYear);
