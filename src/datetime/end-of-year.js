import { pipe } from './../utils';
import { roundDecorator } from './decorator';

import ceilYear from './ceil-year';
import subtractMonths from './subtract-months';
import endOfMonth from './end-of-month';

export const endOfYear = (isoDatetime) => pipe(
  ceilYear,
  subtractMonths(1),
  endOfMonth,
)(isoDatetime);

export default roundDecorator(endOfYear);
