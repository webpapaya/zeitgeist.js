import { compose } from './../utils';
import { roundDecorator } from './decorator';

import subtractSeconds from './subtract-seconds';
import endOfSecond from './end-of-second';
import ceilMinute from './ceil-minutes';

const endOfMinute = (isoDatetime) => {
  return compose(
    ceilMinute,
    subtractSeconds(1),
    endOfSecond,
  )(isoDatetime);
};

export default roundDecorator(endOfMinute);
