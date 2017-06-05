import { pipe } from '../../utils';

import fromUnixMicrosecond from '../from-unix-microseconds';
import toUnixMicrosecond from '../to-unix-microseconds';

export const normalize = (isoDatetime) => pipe(
  toUnixMicrosecond,
  fromUnixMicrosecond,
)(isoDatetime);
