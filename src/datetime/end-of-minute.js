import { compose } from './../utils';
import { ceilMinute } from './calculations/ceil';
import { roundDecorator } from './decorator';

import subtractSeconds from './subtract-seconds';
import endOfSecond from './end-of-second';

const endOfMinute = (isoDatetime) => {
  return compose(
    ceilMinute,
    subtractSeconds(1),
    endOfSecond,
  )(isoDatetime);
};

export default roundDecorator(endOfMinute);
